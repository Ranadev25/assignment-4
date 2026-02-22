const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote - Full-time - $130,000 - $175,000",
    status: "Not Applied",
    description:
      "Mobile First Corp develops innovative mobile applications for global clients, focusing on performance and user experience.",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles - Part-time - $80,000 - $120,000",
    status: "Not Applied",
    description:
      "WebFlow Agency specializes in creating modern, responsive websites and web applications with stunning visual designs.",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston - Full-time - $125,000 - $165,000",
    status: "Not Applied",
    description:
      "DataViz Solutions provides expert data visualization services, turning complex datasets into easy-to-understand insights.",
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle - Full-time - $140,000 - $190,000",
    status: "Not Applied",
    description:
      "CloudFirst Inc offers scalable cloud-based solutions, helping businesses migrate to modern infrastructure efficiently.",
  },
  {
    id: 5,
    company: "NextGen Tech",
    position: "Frontend Developer",
    location: "New York - Full-time - $110,000 - $150,000",
    status: "Not Applied",
    description:
      "NextGen Tech builds cutting-edge web technologies, providing innovative frontend solutions with high performance and usability.",
  },
  {
    id: 6,
    company: "AI Future Labs",
    position: "Machine Learning Engineer",
    location: "San Francisco - Full-time - $150,000 - $200,000",
    status: "Not Applied",
    description:
      "AI Future Labs focuses on advanced artificial intelligence research, developing machine learning models for real-world applications.",
  },
  {
    id: 7,
    company: "Creative Minds Studio",
    position: "UI/UX Designer",
    location: "Austin - Contract - $90,000 - $110,000",
    status: "Not Applied",
    description:
      "Creative Minds Studio delivers exceptional UI/UX designs, combining creativity and functionality to enhance user engagement.",
  },
  {
    id: 8,
    company: "SecureNet Systems",
    position: "Cybersecurity Analyst",
    location: "Chicago - Full-time - $120,000 - $160,000",
    status: "Not Applied",
    description:
      "SecureNet Systems provides top-tier cybersecurity services, protecting businesses from cyber threats and data breaches.",
  },
];

const activeButtons = document.querySelectorAll(".button");
const ul = document.querySelector("ul");
const current_card = document.querySelector(".current-card");
const current_number = document.querySelector(".current-number");
const total = document.getElementById("total");
const totalCard = document.getElementById("totalCard");
const interview = document.getElementById("interview");
const rejected = document.getElementById("rejected");
const emtyDive = document.querySelector(".emtyDive");

let interviewList = [];
let rejectedList = [];


total.innerText = jobs.length;
totalCard.innerText = jobs.length;
interview.innerText = interviewList.length;
rejected.innerText = rejectedList.length;
emtyDive.style.display = "none";



document.addEventListener("DOMContentLoaded", () => {
  handelRenderJobs(jobs, "all");
  current_card.style.display = "none";
});



activeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    if (button.value === "All") {
      emtyDive.style.display = "none";
      handelRenderJobs(jobs, "all");
      current_card.style.display = "none";
      totalCard.innerText = jobs.length;
    } else if (button.value === "Interview") {
      interviewList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");

      handelRenderJobs(interviewList, "interview");
      if (interviewList.length >= 1) {
        current_card.style.display = "inline-block";
        current_number.innerHTML = interviewList.length;
      } else {
        current_number.innerHTML = 0;
        current_card.style.display = "none";
        totalCard.innerText = 0;
      }
    } else if (button.value === "Rejected") {
      rejectedList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");
      handelRenderJobs(rejectedList, "rejected");
      current_card.style.display = "inline-block";
      if (rejectedList.length >= 1) {
        current_number.innerHTML = rejectedList.length;
      } else {
        current_number.innerHTML = 0;
        current_card.style.display = "none";
        totalCard.innerText = 0;
      }
    }
  });
});


function handelRenderJobs(jobList, type) {
  ul.innerHTML = "";
  jobList.forEach((item) => {
    const li = document.createElement("li");
    li.className = "border-2 border-[#ddd] my-5 p-5 rounded-xl";

    if (interviewList.includes(item)) {
      li.classList.add("border-l-4", "border-l-green-400");
    } else if (rejectedList.includes(item)) {
      li.classList.add("border-l-4", "border-l-red-400");
    }

    showAllCard(li, item);

    ul.appendChild(li);

    handelDeleteCard(li, item, type);

    handelInterviewBtn(li, item, type);

    handelRejectedBtn(li, item, type);
   
  });
}


const handelInterviewBtn = (li, item, type) => {
  li.querySelector(".interview").addEventListener("click", () => {
    if (!interviewList.includes(item)) {
      interviewList.push(item);
      interview.innerText = interviewList.length;
      let liValue = li.querySelector(".current-status");
      liValue.innerText = "Interview";
      liValue.classList.add("current-interview");
      liValue.classList.remove("current-rejected");
      li.classList.remove("border-l-4", "border-l-red-400");
      li.classList.add("border-l-4", "border-l-green-400");
    }

    rejectedList = rejectedList.filter((job) => job !== item);
    rejected.innerText = rejectedList.length;

    if (type === "rejected") {
      li.remove();

      if (rejectedList.length === 0) {
        emtyDive.style.display = "block";
      }

      interview.innerText = rejectedList.length;
      rejectedList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");
      if (rejectedList.length >= 1) {
        current_number.innerHTML = rejectedList.length;
      } else {
        current_number.innerHTML = 0;
        totalCard.innerText = 0;
        current_card.style.display = "none";
      }
    }
  });
};

const handelRejectedBtn = (li, item, type) => {
  li.querySelector(".rejected").addEventListener("click", () => {
    if (!rejectedList.includes(item)) {
      rejectedList.push(item);
      rejected.innerText = rejectedList.length;
      let liValue = li.querySelector(".current-status");
      liValue.innerText = "rejected";
      liValue.classList.remove("current-interview");
      liValue.classList.add("current-rejected");
      li.classList.remove("border-l-4", "border-l-green-400");
      li.classList.add("border-l-4", "border-l-red-400");
    }

    interviewList = interviewList.filter((job) => job !== item);
    interview.innerText = interviewList.length;

    if (type === "interview") {
      li.remove();
      if (interviewList.length === 0) {
        emtyDive.style.display = "block";
      }

      interviewList = interviewList.filter((job) => job !== item);
      interview.innerText = interviewList.length;
      interviewList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");
      if (interviewList.length >= 1) {
        current_number.innerHTML = interviewList.length;
      } else {
        current_number.innerHTML = 0;
        totalCard.innerText = 0;
        current_card.style.display = "none";
      }
    }
  });
};

const showAllCard = (li, item) => {
  li.innerHTML = `
      <div class="lavel-up flex justify-between">
        <div>
          <h1 class="company font-bold">${item.company}</h1>
          <h3 class="position">${item.position}</h3>
        </div>
        <div class="delete-icon cursor-pointer">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
      <p class="location">${item.location}</p>
      <button class="current-status">${item.status}</button>
      <p class="desc">${item.description}</p>
      <div class="buttons mt-2">
        <button class="interview bg-green-200 px-2 py-1 rounded">Interview</button>
        <button class="rejected bg-red-200 px-2 py-1 rounded">Rejected</button>
      </div>
    `;
};

const handelDeleteCard = (li, item, type) => {
  li.querySelector(".delete-icon").addEventListener("click", () => {
    if (type === "all") {
      jobs.splice(jobs.indexOf(item), 1);
      total.innerText = jobs.length;
      totalCard.innerText = jobs.length;
    } else if (type === "interview") {
      interviewList = interviewList.filter((job) => job !== item);
      interview.innerText = interviewList.length;
      interviewList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");
      if (interviewList.length >= 1) {
        current_number.innerHTML = interviewList.length;
      } else {
        current_number.innerHTML = 0;
        totalCard.innerText = 0;
        current_card.style.display = "none";
      }
    } else if (type === "rejected") {
      rejectedList = rejectedList.filter((job) => job !== item);
      rejected.innerText = rejectedList.length;
      rejectedList.length === 0
        ? (emtyDive.style.display = "block")
        : (emtyDive.style.display = "none");
      if (rejectedList.length >= 1) {
        current_number.innerHTML = rejectedList.length;
      } else {
        current_number.innerHTML = 0;
        totalCard.innerText = 0;
        current_card.style.display = "none";
      }
    }
    li.remove();
  });
};
