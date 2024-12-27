// blogPosts.js

const blogPosts = [
    {
        id: 1,
        title: "The Journey of JavaScript",
        postImage: "/images/pic1.png",
        content: "JavaScript has come a long way since its inception in 1995. It has evolved into a versatile language that powers the web.",
        author: "Jane Doe",
        date: "2023-10-01",
        tags: ["JavaScript", "Programming", "Web Development"],
        user: {
            name: "Jane Doe",
            photo: "/images/pic1.png" // Same as postImage
        }
    },
    {
        id: 2,
        title: "Understanding CSS Grid",
        postImage: "/images/pic2.png",
        content: "CSS Grid Layout is a two-dimensional layout system for the web. It allows you to create complex layouts with ease.",
        author: "John Smith",
        date: "2023-09-15",
        tags: ["CSS", "Web Design", "Layout"],
        user: {
            name: "John Smith",
            photo: "/images/pic2.png" // Same as postImage
        }
    },
    {
        id: 3,
        title: "Getting Started with React",
        postImage: "/images/pic3.png",
        content: "React is a popular JavaScript library for building user interfaces. This post covers the basics of getting started with React.",
        author: "Emily Johnson",
        date: "2023-08-22",
        tags: ["React", "JavaScript", "Frontend"],
        user: {
            name: "Emily Johnson",
            photo: "/images/pic3.png" // Same as postImage
        }
    },
    {
        id: 4,
        title: "Node.js: A Server-Side JavaScript Solution",
        postImage: "/images/pic4.png",
        content: "Node.js allows developers to use JavaScript on the server side. This article explores its benefits and use cases.",
        author: "Michael Brown",
        date: "2023-07-30",
        tags: ["Node.js", "JavaScript", "Backend"],
        user: {
            name: "Michael Brown",
            photo: "/images/pic4.png" // Same as postImage
        }
    },
    {
        id: 5,
        title: "A Guide to Responsive Web Design",
        postImage: "/images/pic5.png",
        content: "Responsive web design is essential in today's multi-device world. Learn how to create layouts that adapt to any screen size.",
        author: "Sarah Wilson",
        date: "2023-06-10",
        tags: ["Responsive Design", "CSS", "Web Development"],
        user: {
            name: "Sarah Wilson",
            photo: "/images/pic5.png" // Same as postImage
        }
    },
    {
        id: 6,
        title: "Exploring the Vue.js Ecosystem",
        postImage: "/images/pic6.png",
        content: "Vue.js is a progressive JavaScript framework. This post dives into its ecosystem and how to get started with Vue.",
        author: "Chris Evans",
        date: "2023-05-25",
        tags: ["Vue.js", "JavaScript", "Frontend"],
        user: {
            name: "Chris Evans",
            photo: "/images/pic6.png" // Same as postImage
        }
    }
];

export default blogPosts;