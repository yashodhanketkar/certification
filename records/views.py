from rest_framework import viewsets, generics
from .models import Student, Teacher, Certificate
from .serializers import StudentSerializer, TeacherSerializer, CertificateSerializer
import jwt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from instance import SECRET_KEY

# Create your views here.


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class StudentTeacherView(generics.ListAPIView):
    serializer_class = TeacherSerializer

    def get_queryset(self):
        student_id = self.kwargs["pk"]
        return Student.objects.get(id=student_id).teachers.all()


class TeacherStudentView(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        teacher_id = self.kwargs["pk"]
        return Teacher.objects.get(id=teacher_id).students.all()


class GenerateCertificateView(generics.CreateAPIView):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        return Certificate.objects.all()


class CertificateView(generics.ListAPIView):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        return Certificate.objects.all()


@api_view(["POST"])
def verify_certificate(request):
    token = request.data.get("token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        student_id = payload.get("student_id")
        teacher_id = payload.get("teacher_id")

        student = Student.objects.get(id=student_id)
        teacher = Teacher.objects.get(id=teacher_id)

        certificate = Certificate.objects.filter(
            student=student,
            teacher=teacher,
        ).first()

        print(certificate)

        if certificate:
            return Response(
                {
                    "valid": True,
                    "certificate": {
                        "title": certificate.title,
                        "date": certificate.date,
                        "by": f"{certificate.teacher.first_name} {certificate.teacher.last_name}",
                        "to": f"{certificate.student.first_name} {certificate.student.last_name}",
                    },
                }
            )
        else:
            return Response(
                {"valid": False, "message": "Certificate not found"},
                status=404,
            )

    except jwt.ExpiredSignatureError:
        return Response(
            {"valid": False, "message": "Certificate has expired"},
            status=401,
        )
    except jwt.DecodeError:
        return Response(
            {"valid": False, "message": "Invalid certificate"},
            status=401,
        )
