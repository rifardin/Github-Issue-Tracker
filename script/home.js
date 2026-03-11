const issueName = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
   .then(res=> res.json())
   .then(json => displaynLesson(json.data));
};

const displaynLesson = (lessons)=>{
    const issueContainer = document.getElementById('issueGrid')
    issueContainer.innerHTML= "";

    for( let lesson of lessons){

        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `

                  <div class="bg-white rounded-xl border border-gray-200 ">
        <div class="p-4 flex justify-between items-start">
            <img src="/assets/Open-Status.png" alt="">
            <span class="bg-[#FEECEC] text-[#EF4444] text-[12px] font-medium px-3 py-1 rounded-full ">${lesson.priority}</span>
        </div>

        <div class="px-5 pb-4 flex-grow">
            <h3 class="text-[#1F2937] font-semibold mb-2">
                Fix Navigation Menu On Mobile Devices
            </h3>
            <p class="text-[#64748B] text-[12px] font-normal ">
                The navigation menu doesn't collapse properly on mobile devices...
            </p>
        </div>

        <div class="px-5 pb-6 flex gap-2">
            <span class="flex items-center gap-1 bg-[#FECACA] text-[#EF4444] text-[12px] font-medium px-1.5 py-1.5 rounded-md border border-red-100">
                <img src="/assets/BugDroid.png" alt=""> BUG
            </span>
            <span class="flex items-center gap-1 bg-[#FFF8DB] text-[#D97706] text-[12px] font-medium px-1.5 py-1 rounded-md border border-orange-100">
                <img src="/assets/help.png" alt=""> HELP WANTED
            </span>
        </div>

        <div class="px-5 py-4 border-t border-gray-100 flex flex-col gap-1 font-normal text-[12px] text-[#64748B]">
            <span>#1  by john_doe</span>
            <span>1/15/2024</span>
        </div>
    </div>
    </div>
        `;
        issueContainer.append(cardDiv);
    }
}
issueName();