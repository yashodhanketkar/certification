import jwt
from rest_framework import serializers
from .models import Student, Teacher, Certificate
from datetime import timedelta, datetime
from instance import SECRET_KEY


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    verification_key = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = "__all__"

    def get_verification_key(self, obj):
        # 5 years of validity for a certificate
        exp_date = datetime(
            year=obj.date.year,
            month=obj.date.month,
            day=obj.date.day,
        ) + timedelta(days=(365 * 5))

        token = jwt.encode(
            {
                "student_id": obj.student.id,
                "teacher_id": obj.teacher.id,
                "exp": exp_date,
            },
            SECRET_KEY,
            algorithm="HS256",
        )
        return token
