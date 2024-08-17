import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";
import logo from "../../assets/images/logo.png";
import { encodeCaesar, decodeCaesar } from "../../ciphers/ceaserCipher";
import { encodeVigenere, decodeVigenere } from "../../ciphers/vigenereCipher";
import { encryptRSA, decryptRSA } from "../../ciphers/rsacipher";

export default function ResultPage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [key, setKey] = useState("");
  const [operation, setOperation] = useState("encode");
  const [cipherType, setCipherType] = useState("");
  const [spinning, setSpinning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("cipher");
    setCipherType(type);
  }, [location.search]);

  const handlePlainTextChange = (e) => setPlainText(e.target.value);
  const handleKeyChange = (e) => setKey(e.target.value); // Handle key change
  const handleOperationChange = (e) => setOperation(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinning(true);

    setTimeout(() => {
      let result = "";

      if (cipherType === "ceasar") {
        const shift = parseInt(key, 10);
        if (operation === "encode") {
          result = encodeCaesar(plainText, shift);
        } else if (operation === "decode") {
          result = decodeCaesar(plainText, shift);
        }
      } else if (cipherType === "vigenere") {
        if (operation === "encode") {
          result = encodeVigenere(plainText, key);
        } else if (operation === "decode") {
          result = decodeVigenere(plainText, key);
        }
      } else if (cipherType === "rsa") {
        if (operation === "encode") {
          result = encryptRSA(plainText);
        } else if (operation === "decode") {
          try {
            result = decryptRSA(plainText);
          } catch (error) {
            console.error("Decryption error:", error);
            result = "Error in decryption. Check input format.";
          }
        }
      }

      setCipherText(result);
      setSpinning(false);
    }, 1000);
  };

  return (
    <div className="result-container">
      <header className="result-header">
        <img
          src={logo}
          alt="Logo"
          className={`result-logo ${spinning ? "spinning" : ""}`}
        />
      </header>
      <h1 className="result-title">Encode/Decode Text using {cipherType}</h1>
      <form onSubmit={handleSubmit} className="result-form">
        <textarea
          value={plainText}
          onChange={handlePlainTextChange}
          placeholder={
            operation === "encode"
              ? "Enter plain text here..."
              : "Enter encrypted message here..."
          }
          className="result-input"
          rows="6"
        />
        {cipherType !== "rsa" && (
          <input
            type="text"
            value={key}
            onChange={handleKeyChange}
            placeholder="Enter key here..."
            className="result-key"
          />
        )}
        <div className="result-controls">
          <label>
            <input
              type="radio"
              name="operation"
              value="encode"
              checked={operation === "encode"}
              onChange={handleOperationChange}
            />
            Encode
          </label>
          <label>
            <input
              type="radio"
              name="operation"
              value="decode"
              checked={operation === "decode"}
              onChange={handleOperationChange}
            />
            Decode
          </label>
          <button type="submit" className="result-button">
            {operation === "encode" ? "Encode" : "Decode"}
          </button>
        </div>
      </form>
      {spinning && (
        <div className="result-loading">
          <p>Processing...</p>
        </div>
      )}
      <div className="result-output">
        <h2>Result:</h2>
        <p>{cipherText}</p>
      </div>
    </div>
  );
}
