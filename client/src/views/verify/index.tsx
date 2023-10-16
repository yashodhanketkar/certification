import { CertificateService } from "@/services";
import { Certificate } from "@/types/api";
import { CertificateVerify } from "@/types/form";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const VerifyPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [certifcate, setCertifcate] = useState<Certificate | null>();
  const [count, setCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateVerify>();

  const onSubmit: SubmitHandler<CertificateVerify> = async (data) => {
    setIsValid(false);
    setCertifcate(null);
    setCount((prev) => ++prev);
    const certifcateData = await CertificateService.verify(data);
    if (certifcateData) {
      setIsValid(certifcateData.valid);
      if (certifcateData.valid) setCertifcate(certifcateData.certificate);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <h1 className="text-2xl font-semibold">Verify Certifcate</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 md:w-1/4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="student">Token</label>
          <textarea
            className="p-1 rounded resize-none ring-1 ring-black/50"
            rows={5}
            {...register("token", { required: true })}
          ></textarea>
          {!!errors.token && (
            <span className="text-xs text-red-500">
              Token is required field
            </span>
          )}
        </div>
        <button
          className="px-2 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-fit"
          type="submit"
        >
          Verify
        </button>
      </form>
      {count !== 0 &&
        (isValid && certifcate ? (
          <CertifcateFormatter {...certifcate} />
        ) : (
          <span className="text-red-500">Invalid Certificate</span>
        ))}
    </div>
  );
};

const CertifcateFormatter = ({ title, date, by, to }: Certificate) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="inline-flex items-center gap-2 text-2xl font-bold">
        Certificate
        <span className="text-sm font-normal text-green-500">(Valid)</span>
      </p>
      <p>Title: {title}</p>
      <p>Date: {date}</p>
      <p>Awarded by: {by}</p>
      <p>Awarded to: {to}</p>
    </div>
  );
};
