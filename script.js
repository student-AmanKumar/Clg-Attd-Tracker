let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  let present = 0, absent = 0;

  students.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "student-card";

    const info = document.createElement("div");
    info.innerHTML = `<strong>${student.name}</strong> (Roll: ${student.roll})`;

    const btn = document.createElement("button");
    btn.className = `status-btn ${student.status}`;
    btn.textContent = student.status === "present" ? "✅ Present" : "❌ Absent";
    btn.onclick = () => toggleStatus(index);

    card.appendChild(info);
    card.appendChild(btn);
    list.appendChild(card);

    student.status === "present" ? present++ : absent++;
  });

  document.getElementById("presentCount").textContent = present;
  document.getElementById("absentCount").textContent = absent;
}

function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();

  if (!name || !roll) return alert("Please enter both name and roll number.");

  students.push({ name, roll, status: "absent" });
  saveToStorage();
  renderStudents();

  document.getElementById("studentName").value = "";
  document.getElementById("rollNumber").value = "";
}

function toggleStatus(index) {
  students[index].status = students[index].status === "present" ? "absent" : "present";
  saveToStorage();
  renderStudents();
}

window.onload = renderStudents;
function filterStudents() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(query) ||
    student.roll.toLowerCase().includes(query)
  );

  renderFilteredStudents(filtered);
}

function renderFilteredStudents(filteredList) {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  let present = 0, absent = 0;

  filteredList.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "student-card";

    const info = document.createElement("div");
    info.innerHTML = `<strong>${student.name}</strong> (Roll: ${student.roll})`;

    const btn = document.createElement("button");
    btn.className = `status-btn ${student.status}`;
    btn.textContent = student.status === "present" ? "✅ Present" : "❌ Absent";
    btn.onclick = () => toggleStatus(index);

    card.appendChild(info);
    card.appendChild(btn);
    list.appendChild(card);

    student.status === "present" ? present++ : absent++;
  });

  document.getElementById("presentCount").textContent = present;
  document.getElementById("absentCount").textContent = absent;
}
// toggle
function toggleStatus(index) {
  students[index].status = students[index].status === "present" ? "absent" : "present";
  saveToStorage();
  filterStudents(); // instead of renderStudents()
}
window.onload = () => {
  renderStudents();
  document.getElementById("searchInput").value = "";
};
function toggleDarkMode() {
  const isDark = document.getElementById("darkToggle").checked;
  const body = document.body;
  const label = document.getElementById("modeLabel");

  if (isDark) {
    body.classList.add("dark-mode");
    label.textContent = "🌙 Dark Mode";
    localStorage.setItem("mode", "dark");
  } else {
    body.classList.remove("dark-mode");
    label.textContent = "🌞 Light Mode";
    localStorage.setItem("mode", "light");
  }
}

function applySavedMode() {
  const savedMode = localStorage.getItem("mode") || "light";
  const toggle = document.getElementById("darkToggle");

  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
    document.getElementById("modeLabel").textContent = "🌙 Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    toggle.checked = false;
    document.getElementById("modeLabel").textContent = "🌞 Light Mode";
  }
}