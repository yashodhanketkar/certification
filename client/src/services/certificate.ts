import { api } from "@/config/api";
import { CertificateGenerate, CertificateVerify } from "@/types/form";

class CertificateServiceClass {
  generte = async (body: CertificateGenerate) => {
    return api
      .post("/generate_certificate/", { ...body })
      .then((res) => res.data)
      .then((data) => {
        return {
          id: data.id,
          key: data.verification_key,
        };
      })
      .catch((err) => console.log(err));
  };

  verify = async (body: CertificateVerify) => {
    return api
      .post("/verify_certificate/", { ...body })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
}

export const CertificateService = new CertificateServiceClass();
