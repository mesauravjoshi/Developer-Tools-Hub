import axios from "axios";
import History from "#models/history.js";

const buildRequestConfig = ({ url, method, headers, data }) => {
  const config = {
    url,
    method,
    headers,
    data,
  };

  const upperMethod = method?.toUpperCase();

  if (["GET", "DELETE", "HEAD", "OPTIONS"].includes(upperMethod)) {
    if (data !== undefined) {
      config.params = data;
    }
  } else if (data !== undefined) {
    config.data = data;
  }

  return config;
};

export const request = async ({ userId, url, method, headers, data }) => {
  // console.log(userId, url, method, headers, data);

  if (!url || !method) {
    throw { status: 400, message: "URL and method are required!" };
  }

  try {
    new URL(url);
  } catch {
    throw { status: 400, message: "Invalid URL provided." };
  }

  const startTime = Date.now();
  const axiosConfig = buildRequestConfig({ url, method, headers, data });

  let response;
  try {
    console.log("========test line ===========", axiosConfig);
    // return { message: "User created successfully.", data: axiosConfig };

    response = await axios({
      ...axiosConfig,
      validateStatus: () => true,
    });
    console.log("response", response);
  } catch (error) {
    console.log("err service", err);
    const endTime = Date.now();
    await History.create({
      userId,
      apiUrl: url,
      method: method.toUpperCase(),
      testedAt: new Date(endTime),
    });

    throw {
      status: error.response?.status || 500,
      message: error.response?.data || error.message || "API request failed",
    };
  }

  const endTime = Date.now();
  await History.create({
    userId,
    apiUrl: url,
    method: method.toUpperCase(),
    testedAt: new Date(endTime),
  });

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
    headers: response.headers,
    requestTimeMs: endTime - startTime,
  };
};
