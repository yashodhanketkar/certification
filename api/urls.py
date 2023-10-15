"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from records.views import (
    StudentViewSet,
    TeacherViewSet,
    StudentTeacherView,
    TeacherStudentView,
    GenerateCertificateView,
    CertificateView,
    verify_certificate,
)

urlpatterns = [
    path("admin/", admin.site.urls),
]


router = routers.DefaultRouter()
router.register(r"students", StudentViewSet)
router.register(r"teachers", TeacherViewSet)

urlpatterns += [
    path("api/", include(router.urls)),
    path(
        "api/students/<int:pk>/teachers/",
        StudentTeacherView.as_view(),
        name="student-teachers",
    ),
    path(
        "api/teachers/<int:pk>/students/",
        TeacherStudentView.as_view(),
        name="teachers-student",
    ),
    path(
        "api/generate_certificate/",
        GenerateCertificateView.as_view(),
        name="generate-certificate",
    ),
    path(
        "api/certificates/",
        CertificateView.as_view(),
        name="certificates",
    ),
    path("api/verify_certificate/", verify_certificate, name="verify-certificate"),
]

urlpatterns += [
    path(
        "openapi/",
        get_schema_view(
            title="Your Project", description="API for all things …", version="1.0.0"
        ),
        name="openapi-schema",
    ),
    path(
        "docs/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": "openapi-schema"},
        ),
        name="swagger-ui",
    ),
    path(
        "redoc/",
        TemplateView.as_view(
            template_name="redoc-ui.html",
            extra_context={"schema_url": "openapi-schema"},
        ),
        name="redoc-ui",
    ),
]
