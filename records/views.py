from rest_framework import viewsets, generics
from .models import Student, Teacher, Certificate
from .serializers import StudentSerializer, TeacherSerializer, CertificateSerializer

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


class CertificateView(generics.ListAPIView):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        return Certificate.objects.all()
