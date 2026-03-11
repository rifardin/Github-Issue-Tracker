const issueName = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
   .then(res => res.json())
   .then(json => displaynLesson(json.data));
};

const displaynLesson = (lessons) => {
    const issueContainer = document.getElementById('issueGrid');
    issueContainer.innerHTML = "";

    for (let lesson of lessons) {
        const cardDiv = document.createElement('div');
        
        const isOpen = lesson.status === 'open';
       
        const statusImg = isOpen ? '/assets/Open-Status.png' : '/assets/Closed-Status.png';
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

<div class="px-5 pb-6 flex flex-wrap gap-2">
    ${lesson.labels.map(label => `
        <span class="inline-flex items-center gap-1 bg-[#FEECEC] text-[#EF4444] text-[10px] font-bold px-2 py-1 rounded-md border border-red-100 uppercase whitespace-nowrap">
            ${label}
        </span>
    `).join('')}
</div>

                <div class="px-5 py-4 border-t border-gray-100 flex flex-col gap-1 font-normal text-[12px] text-[#64748B]">
                    <span>#${lesson.id} by ${lesson.author}</span>
                    <span>${new Date(lesson.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        issueContainer.append(cardDiv);
    }
}
issueName();