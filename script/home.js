let allIssues = []; 

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value;

    
    if (!searchText) {
        displaynLesson(allIssues);
        return;
    }

    
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(json => {
            
            displaynLesson(json.data);
        })
        
});









const issueName = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(json => {
            allIssues = json.data;
            displayLesson(allIssues); 
        });
};


const filterIssues = (status, event) => {
    
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#4A00FF]', 'text-white');
        btn.classList.add('bg-white', 'text-gray-500', 'border-gray-100');
    });

    
    const clickedBtn = event.currentTarget;
    clickedBtn.classList.remove('bg-white', 'text-gray-500', 'border-gray-100');
    clickedBtn.classList.add('bg-[#4A00FF]', 'text-white');

    
    if (status === 'all') {
        displayLesson(allIssues);
    } else {
        const filtered = allIssues.filter(issue => issue.status === status);
        displayLesson(filtered);
    }
};



    const displayLesson = (lessons) => {
    const issueContainer = document.getElementById('issueGrid');
    const countElement = document.getElementById('count'); 
    
   
    if (countElement) {
        countElement.innerText = lessons.length; 
    }
    issueContainer.innerHTML = "";

    for (let lesson of lessons) {
        const cardDiv = document.createElement('div');
        
        const isOpen = lesson.status === 'open';
       
        const statusImg = isOpen ? './assets/Open-Status.png' : './assets/Closed-Status.png';
        const borderColor = isOpen ? 'border-t-[#00A96E] border-[5px]' : 'border-t-[#A855F7] border-[5px]';

        cardDiv.innerHTML = `
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full ${borderColor}">
                <div class="p-4 flex justify-between items-start">
                    <img src="${statusImg}" alt="${lesson.status}">
                    
                    <span class="bg-[#FEECEC] text-[#EF4444] text-[12px] font-medium px-3 py-1 rounded-full ">
                        ${lesson.priority}
                    </span>
                </div>

                <div class="px-5 pb-4 flex-grow">
                    <h3 class="text-[#1F2937] font-semibold mb-2 ">
                        ${lesson.title}
                    </h3>
                    <p class="text-[#64748B] text-[12px] font-normal ">
                        ${lesson.description}
                    </p>
                </div>

<div class="px-5 pb-6 flex flex-wrap gap-2 items-start">
    ${lesson.labels.map(label => {
        
        let badgeStyle = "bg-[#FEECEC] text-[#EF4444] border-red-100";
        let badgeIcon = "/assets/BugDroid.png";

        if (label.toLowerCase() === 'enhancement') {
            badgeStyle = "bg-[#BBF7D0] text-[#00A96E] border-emerald-100";
            badgeIcon = "/assets/Sparkle.png";
        } else if (label.toLowerCase() === 'help wanted') {
            badgeStyle = "bg-[#FDE68A] text-[#D97706] border-orange-100";
            badgeIcon = "/assets/help.png";
        } else if (label.toLowerCase() === 'documentation') {
            badgeStyle = "bg-gray-100 text-gray-600 border-gray-200";
            badgeIcon = "/assets/help.png"; 
        } else if (label.toLowerCase() === 'good first issue') {
            badgeStyle = "bg-[#FEECEC] text-[#EF4444] border-red-100";
            badgeIcon = "/assets/BugDroid.png";
        }

        return `
            <span class="inline-flex items-center gap-1 ${badgeStyle} text-[10px] font-bold px-2 py-1 rounded-md border uppercase whitespace-nowrap h-fit">
                <img src="${badgeIcon}" class="w-3 h-3" alt="">
                ${label}
            </span>
        `;
    }).join('')}
    </div>
                <div class="px-5 py-4 border-t border-gray-100 flex flex-col gap-1 font-normal text-[12px] text-[#64748B]">
                    <span>#${lesson.id} by ${lesson.author}</span>
                    <span>${new Date(lesson.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            
        `;
        cardDiv.onclick = () => openModal(lesson.id);
            cardDiv.classList.add('cursor-pointer');
        issueContainer.append(cardDiv);
    }
}
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const searchedIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchText) || 
        issue.description.toLowerCase().includes(searchText)
    );
    displayLesson(searchedIssues);
});

issueName();





          const openModal = (id) => {
              const modal = document.getElementById('modal');
              const modalBody = document.getElementById('modalBody');

    
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(json => {
            const data = json.data;

            
            const statusBg = data.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#A855F7]';

            modalBody.innerHTML = `
                <div class="space-y-4 text-left">
                    <h2 class="text-2xl font-bold text-[#1F2937]">${data.title}</h2>
                    <div class="flex items-center gap-2">
                        <span class="px-2.5 py-1.5 rounded-full text-[12px] font-normal text-white ${statusBg}">
                            ${data.status.toUpperCase()}
                        </span>
                        <span class="text-[#64748B] text-[12px]">Opened by ${data.author} • ${new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <p class="text-[#64748B] text-[12px] ">${data.description}</p>
                    
                    <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
                        <div>
                            <p class="text-[16px] text-[#64748B] font-normal">Assignee</p>
                            <p class="font-semibold text-[#1F2937] text-sm">${data.author}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[16px] text-[#64748B] font-normal">Priority</p>
                            <span class="px-3 py-1 rounded-lg bg-[#EF4444] text-[#FFFFFF] font-medium text-[12px] uppercase">
                                ${data.priority}
                            </span>
                        </div>
                    </div>

                    <div class="flex justify-end pt-4">
                        <button onclick="closeModal()" class="bg-[#4F00FF] text-[#FFFFFF] px-10 py-2.5 rounded-lg font-semibold text-[16px] hover:bg-[#4000D9] ">
                            Close
                        </button>
                    </div>
                </div>
            `;
            
                     modal.classList.remove('hidden'); 
                     document.body.style.overflow = 'hidden'; 
            
        })
};


    const closeModal = () => {


         document.getElementById('modal').classList.add('hidden');
         document.body.style.overflow = 'auto'; 
};