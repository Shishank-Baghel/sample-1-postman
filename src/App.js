import React, { useState, useEffect } from "react";
import axios from "axios";

function PostmanClone() {
  const [requestUrl, setRequestUrl] = useState("");
  const [requestMethod, setRequestMethod] = useState("GET");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);

  const handleUrlChange = (event) => {
    setRequestUrl(event.target.value);
  };

  const handleMethodChange = (event) => {
    setRequestMethod(event.target.value);
  };

  const handleBodyChange = (event) => {
    setRequestBody(event.target.value);
  };

  const handleHeaderChange = (index, key, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][key] = value;
    setHeaders(updatedHeaders);
  };

  const handleHeaderAdd = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleHeaderRemove = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const sendRequest = async () => {
    try {
      const config = {
        method: requestMethod,
        url: requestUrl,
        headers: headers.reduce(
          (acc, header) => ({ ...acc, [header.key]: header.value }),
          {}
        ),
        data: requestBody,
      };

      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div className="container">
      <h1>Simple Postman Clone</h1>

      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={requestUrl}
          onChange={handleUrlChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="method">Method:</label>
        <select
          id="method"
          value={requestMethod}
          onChange={handleMethodChange}
          className="form-control"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="headers">Headers:</label>
        <ul>
          {headers.map((header, index) => (
            <li key={index}>
              <input
                type="text"
                placeholder="Key"
                value={header.key}
                onChange={(e) =>
                  handleHeaderChange(index, "key", e.target.value)
                }
              />
              :
              <input
                type="text"
                placeholder="Value"
                value={header.value}
                onChange={(e) =>
                  handleHeaderChange(index, "value", e.target.value)
                }
              />
              <button onClick={() => handleHeaderRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleHeaderAdd}>Add Header</button>
      </div>

      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={requestBody}
          onChange={handleBodyChange}
          className="form-control"
        />
      </div>

      <button onClick={sendRequest}>Send Request</button>

      {error && <div className="alert alert-danger">{error}</div>}

      {response && (
        <div className="card">
          <div className="card-header">Response</div>
          <div className="card-body">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostmanClone;
