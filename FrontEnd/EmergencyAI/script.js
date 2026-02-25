//sample queue data
let calls = [
    { id: 1, caller_name: "Hubert", emotion_label: "distress", priority_score: 0.98, status: "active" },
    { id: 2, caller_name: "Sabari", emotion_label: "distress", priority_score: 0.95, status: "queued" },
    { id: 3, caller_name: "Pravin", emotion_label: "panic", priority_score: 0.85, status: "queued" },
    { id: 4, caller_name: "Dharshan", emotion_label: "neutral", priority_score: 0.40, status: "queued" }
];

let currentCall = null;

//render queue
function renderQueue() {
    let queueDiv = document.getElementById("queueList");
    queueDiv.innerHTML = "";

    calls.sort((a, b) => b.priority_score - a.priority_score);

    calls.forEach(call => {
        if (call.status === "queued") {
            let div = document.createElement("div");
            div.className = "queue-item";
            div.innerHTML = `
                <b>${call.caller_name}</b><br>
                Emotion: <span class="${call.emotion_label}">${call.emotion_label}</span><br>
                Priority: ${call.priority_score}
            `;

            div.onclick = () => pickCall(call.id);
            queueDiv.appendChild(div);
        }
    });
}

//pick call
function pickCall(id) {
    let call = calls.find(c => c.id === id);
    call.status = "active";
    currentCall = call;

    document.getElementById("callerName").innerText = call.caller_name;
    document.getElementById("callerEmotion").innerText = call.emotion_label;

    renderQueue();
}

//call cut
function hangup() {
    if (!currentCall) return;
    currentCall.status = "completed";
    loadNextCall();
}

function switchTeller() {
    if (currentCall) {
        currentCall.status = "completed";
    }
    loadNextCall();
}

function loadNextCall() {
    // Find next in priority queue
    let nextCall = calls
        .filter(c => c.status === "queued")
        .sort((a, b) => b.priority_score - a.priority_score)[0];

    if (nextCall) {
        pickCall(nextCall.id);
    } else {
        currentCall = null;
        document.getElementById("callerName").innerText = "None";
        document.getElementById("callerEmotion").innerText = "-";
        renderQueue();
    }
}

function clearNotes() {
    document.getElementById("notesArea").value = "";
}

function exportNotes() {
    const notes = document.getElementById("notesArea").value;
    if (!notes.trim()) {
        alert("Notes are empty!");
        return;
    }

    let filename = `emergency_notes_${new Date().getTime()}`;
    if (currentCall) {
        filename = `${currentCall.id}_${currentCall.caller_name}`;
    }

    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function init() {
    //active call already
    let activeCall = calls.find(c => c.status === "active");
    if (activeCall) {
        currentCall = activeCall;
        document.getElementById("callerName").innerText = activeCall.caller_name;
        document.getElementById("callerEmotion").innerText = activeCall.emotion_label;
    }
    renderQueue();
}

init();