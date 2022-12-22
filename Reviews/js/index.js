const reviews = [
    {
      id: 1,
      name: "susan smith",
      job: "web developer",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
      text:
        "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: "anna johnson",
      job: "web designer",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
      text:
        "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
    },
    {
      id: 3,
      name: "peter jones",
      job: "intern",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
      text:
        "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
    },
    {
      id: 4,
      name: "bill anderson",
      job: "the boss",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
      text:
        "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
    },
  ];

let count = 0;

const container = document.querySelector('.container');
const img = document.querySelector("#image");
const name = document.querySelector("#name");
const job = document.querySelector("#job");

const renderUser = () => {
    img.src = reviews[count].img;
    name.innerText = reviews[count].name;
    job.innerText = reviews[count].job;
    description.innerText = reviews[count].text;
};

window.addEventListener('DOMContentLoaded', renderUser);

//Getting the className of the clicked element to take an action
container.addEventListener('click', (e) => {
    const btn = e.target.classList;
    // Getting the next review
    if(btn.contains('next-btn')) {
        count >= reviews.length - 1? count = 0 : count++;
    }
    // Getting the prev review
    else if (btn.contains('prev-btn')) {
        count <=  0 ? count = reviews.length - 1 : count--;
    }
    // Getting random review
    else if (btn.contains('random-btn')) {
        count = Math.floor(Math.random() * reviews.length);
    }

    return renderUser();
})