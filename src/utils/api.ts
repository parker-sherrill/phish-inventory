// utils/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:5000";

function logRequest(method: string, url: string, body?: any) {
  console.log(`[API] ${method} ${url}`, body ? { body } : {});
}

function logResponse(method: string, url: string, res: Response, data: any) {
  console.log(
    `[API] Response ${method} ${url} -> ${res.status} ${res.statusText}`,
    data
  );
}

export async function fetchReports() {
  const url = `${API_BASE}/emails`;
  logRequest("GET", url);

  const res = await fetch(url);
  let data: any;
  try {
    data = await res.json();
  } catch (err) {
    console.error("[API] Failed to parse JSON:", err);
    throw err;
  }

  logResponse("GET", url, res, data);

  if (!res.ok) {
    throw new Error(`Failed to fetch reports: ${res.status}`);
  }
  return data;
}

export async function createReport(report: {
  url: string;
  description: string;
  type: string;
  severity: string;
  reporterName: string;
  reporterEmail: string;
}) {
  const url = `${API_BASE}/emails`;
  logRequest("POST", url, report);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  let data: any;
  try {
    data = await res.json();
  } catch (err) {
    console.error("[API] Failed to parse JSON:", err);
    throw err;
  }

  logResponse("POST", url, res, data);

  if (!res.ok) {
    throw new Error(`Failed to create report: ${res.status}`);
  }
  return data;
}

export async function deleteReport(id: string) {
  const url = `${API_BASE}/emails/${id}`;
  logRequest("DELETE", url);

  const res = await fetch(url, { method: "DELETE" });

  let data: any;
  try {
    data = await res.json();
  } catch (err) {
    console.error("[API] Failed to parse JSON:", err);
    throw err;
  }

  logResponse("DELETE", url, res, data);

  if (!res.ok) {
    throw new Error(`Failed to delete report: ${res.status}`);
  }
  return data;
}
