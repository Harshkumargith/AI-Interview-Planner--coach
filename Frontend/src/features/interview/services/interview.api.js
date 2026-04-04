// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:3000",
//     withCredentials: true,
// })


// /**
//  * @description Service to generate interview report based on user self description, resume and job description.
//  */
// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

//     const formData = new FormData()
//     formData.append("jobDescription", jobDescription)
//     formData.append("selfDescription", selfDescription)
//     formData.append("resume", resumeFile)

//     const response = await api.post("/api/interview/", formData, {
//         headers: {
//             "Content-Type": "multipart/form-data"
//         }
//     })

//     return response.data

// }


// /**
//  * @description Service to get interview report by interviewId.
//  */
// export const getInterviewReportById = async (interviewId) => {
//     const response = await api.get(`/api/interview/report/${interviewId}`)

//     return response.data
// }


// /**
//  * @description Service to get all interview reports of logged in user.
//  */
// export const getAllInterviewReports = async () => {
//     const response = await api.get("/api/interview/")

//     return response.data
// }


// /**
//  * @description Service to generate resume pdf based on user self description, resume content and job description.
//  */
// export const generateResumePdf = async ({ interviewReportId }) => {
//     const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
//         responseType: "blob"
//     })

//     return response.data
// }

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description Generate interview report
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    // ✅ FIX: only append if file exists
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    // ✅ FIX: correct route
    const response = await api.post(
      "/api/interview/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
  }
};

/**
 * @description Get report by ID
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @description Get all reports
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};

/**
 * @description Generate resume PDF
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    }
  );

  return response.data;
};