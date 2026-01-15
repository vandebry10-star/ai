import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send(e) {
    e.preventDefault();
    if (!msg) return;

    setChat([...chat, { from: "user", text: msg }]);
    setLoading(true);
    setMsg("");

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });

      const d = await r.json();
      setChat(c => [...c, { from: "ai", text: d.reply }]);
    } catch {
      setChat(c => [...c, { from: "ai", text: "Error." }]);
    }

    setLoading(false);
  }

  return (
    <div style={{
      background:"#0f0f13",
      color:"#eaeaea",
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      maxWidth:720,
      margin:"auto"
    }}>
      <h3 style={{textAlign:"center",color:"#6ae3ff"}}>Azbry-AI</h3>

      <div style={{flex:1,overflowY:"auto",padding:12}}>
        {chat.map((c,i)=>(
          <div key={i} style={{
            textAlign:c.from==="user"?"right":"left",
            marginBottom:10
          }}>
            <span style={{
              display:"inline-block",
              padding:10,
              borderRadius:12,
              background:c.from==="user"?"#6ae3ff":"#222",
              color:c.from==="user"?"#000":"#fff"
            }}>{c.text}</span>
          </div>
        ))}
        {loading && <p>Azbry-AI lagi mikir...</p>}
      </div>

      <form onSubmit={send} style={{display:"flex",gap:8,padding:10}}>
        <input
          value={msg}
          onChange={e=>setMsg(e.target.value)}
          placeholder="Tanya ke Azbry-AI..."
          style={{flex:1,padding:10}}
        />
        <button>Kirim</button>
      </form>
    </div>
  );
}
