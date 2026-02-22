"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function ApiTester() {
  const [getAllOut, setGetAllOut] = useState<string>("—");
  const [getAllStatus, setGetAllStatus] = useState<string>("");
  const [getOneId, setGetOneId] = useState("1");
  const [getOneOut, setGetOneOut] = useState<string>("—");
  const [getOneStatus, setGetOneStatus] = useState<string>("");
  const [postBody, setPostBody] = useState('{"name": "thing", "value": 42}');
  const [postOut, setPostOut] = useState<string>("—");
  const [postStatus, setPostStatus] = useState<string>("");
  const [putId, setPutId] = useState("1");
  const [putBody, setPutBody] = useState('{"name": "updated", "value": 99}');
  const [putOut, setPutOut] = useState<string>("—");
  const [putStatus, setPutStatus] = useState<string>("");
  const [deleteId, setDeleteId] = useState("1");
  const [deleteOut, setDeleteOut] = useState<string>("—");
  const [deleteStatus, setDeleteStatus] = useState<string>("");

  async function callGet() {
    setGetAllOut("…");
    try {
      const r = await fetch(`${API_BASE}/api/items`);
      const data = await r.json();
      setGetAllOut(JSON.stringify(data, null, 2));
      setGetAllStatus(`${r.status} ${r.statusText}`);
    } catch (e) {
      setGetAllOut(String(e));
      setGetAllStatus("Error");
    }
  }

  async function callGetOne() {
    setGetOneOut("…");
    try {
      const r = await fetch(`${API_BASE}/api/items/${getOneId}`);
      const data = await r.json();
      setGetOneOut(JSON.stringify(data, null, 2));
      setGetOneStatus(`${r.status} ${r.statusText}`);
    } catch (e) {
      setGetOneOut(String(e));
      setGetOneStatus("Error");
    }
  }

  async function callPost() {
    let body: unknown;
    try {
      body = JSON.parse(postBody);
    } catch (e) {
      setPostOut("Invalid JSON: " + (e instanceof Error ? e.message : String(e)));
      setPostStatus("Error");
      return;
    }
    setPostOut("…");
    try {
      const r = await fetch(`${API_BASE}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      setPostOut(JSON.stringify(data, null, 2));
      setPostStatus(`${r.status} ${r.statusText}`);
    } catch (e) {
      setPostOut(String(e));
      setPostStatus("Error");
    }
  }

  async function callPut() {
    let body: unknown;
    try {
      body = JSON.parse(putBody);
    } catch (e) {
      setPutOut("Invalid JSON: " + (e instanceof Error ? e.message : String(e)));
      setPutStatus("Error");
      return;
    }
    setPutOut("…");
    try {
      const r = await fetch(`${API_BASE}/api/items/${putId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      setPutOut(JSON.stringify(data, null, 2));
      setPutStatus(`${r.status} ${r.statusText}`);
    } catch (e) {
      setPutOut(String(e));
      setPutStatus("Error");
    }
  }

  async function callDelete() {
    setDeleteOut("…");
    try {
      const r = await fetch(`${API_BASE}/api/items/${deleteId}`, {
        method: "DELETE",
      });
      const data = await r.json();
      setDeleteOut(JSON.stringify(data, null, 2));
      setDeleteStatus(`${r.status} ${r.statusText}`);
    } catch (e) {
      setDeleteOut(String(e));
      setDeleteStatus("Error");
    }
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="pageTitle">WRX API</h1>
          <p className="sub">Input → request → Output. Backend: {API_BASE}</p>
        </div>
        <Link href="/login" style={{ color: "var(--post)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
      </div>

      <div className="flow">
        <h2>
          <span className="method get">GET</span> List all items
        </h2>
        <div className="row">
          <div className="box">
            <label>Request</label>
            <pre>GET /api/items</pre>
          </div>
          <div className="box">
            <label>Response</label>
            <pre className={getAllOut === "—" ? "empty" : ""}>{getAllOut}</pre>
            <span className={`status ${getAllStatus.startsWith("2") ? "ok" : "err"}`}>
              {getAllStatus}
            </span>
          </div>
        </div>
        <button type="button" className="btn-get" onClick={callGet}>
          Send GET
        </button>
      </div>

      <div className="flow">
        <h2>
          <span className="method get">GET</span> One item by ID
        </h2>
        <div className="row">
          <div className="box">
            <label>Input (item ID)</label>
            <input
              type="number"
              value={getOneId}
              onChange={(e) => setGetOneId(e.target.value)}
              placeholder="e.g. 1"
            />
          </div>
          <div className="box">
            <label>Request</label>
            <pre>GET /api/items/{getOneId || "1"}</pre>
          </div>
          <div className="box">
            <label>Response</label>
            <pre className={getOneOut === "—" ? "empty" : ""}>{getOneOut}</pre>
            <span className={`status ${getOneStatus.startsWith("2") ? "ok" : "err"}`}>
              {getOneStatus}
            </span>
          </div>
        </div>
        <button type="button" className="btn-get" onClick={callGetOne}>
          Send GET
        </button>
      </div>

      <div className="flow">
        <h2>
          <span className="method post">POST</span> Create item
        </h2>
        <div className="row">
          <div className="box">
            <label>Input (JSON body)</label>
            <textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder='{"name": "thing", "value": 42}'
            />
          </div>
          <div className="box">
            <label>Response</label>
            <pre className={postOut === "—" ? "empty" : ""}>{postOut}</pre>
            <span className={`status ${postStatus.startsWith("2") ? "ok" : "err"}`}>
              {postStatus}
            </span>
          </div>
        </div>
        <button type="button" className="btn-post" onClick={callPost}>
          Send POST
        </button>
      </div>

      <div className="flow">
        <h2>
          <span className="method put">PUT</span> Update item
        </h2>
        <div className="row">
          <div className="box">
            <label>Item ID</label>
            <input
              type="number"
              value={putId}
              onChange={(e) => setPutId(e.target.value)}
              placeholder="1"
            />
          </div>
          <div className="box">
            <label>Input (JSON body)</label>
            <textarea
              value={putBody}
              onChange={(e) => setPutBody(e.target.value)}
              placeholder='{"name": "updated", "value": 99}'
            />
          </div>
          <div className="box">
            <label>Response</label>
            <pre className={putOut === "—" ? "empty" : ""}>{putOut}</pre>
            <span className={`status ${putStatus.startsWith("2") ? "ok" : "err"}`}>
              {putStatus}
            </span>
          </div>
        </div>
        <button type="button" className="btn-put" onClick={callPut}>
          Send PUT
        </button>
      </div>

      <div className="flow">
        <h2>
          <span className="method delete">DELETE</span> Delete item
        </h2>
        <div className="row">
          <div className="box">
            <label>Input (item ID)</label>
            <input
              type="number"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              placeholder="1"
            />
          </div>
          <div className="box">
            <label>Request</label>
            <pre>DELETE /api/items/{deleteId || "1"}</pre>
          </div>
          <div className="box">
            <label>Response</label>
            <pre className={deleteOut === "—" ? "empty" : ""}>{deleteOut}</pre>
            <span className={`status ${deleteStatus.startsWith("2") ? "ok" : "err"}`}>
              {deleteStatus}
            </span>
          </div>
        </div>
        <button type="button" className="btn-delete" onClick={callDelete}>
          Send DELETE
        </button>
      </div>
    </div>
  );
}
