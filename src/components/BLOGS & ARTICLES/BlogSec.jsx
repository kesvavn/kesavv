import { useState } from "react";
import "./BlogSection.css";

import Blogimage from "../BLOGS & ARTICLES/JYO03778-r8jo0bhvon3rsf27yrsda1scrk5hyw3c3hoxrsgcns.webp";
import Blogimage2 from "../BLOGS & ARTICLES/Plan-your-dream-wedding-at-@tripislifeDestinationWedding-Wedding-LuxuryWedding-Royal-wow-vibe-mood-kerala-India-Varkala-varkaladiaries-1-r7mcws28kzzw5gbl2v5fcq7gdhgmvey9g08jk.jpg";
import Blogimage3 from "../BLOGS & ARTICLES/couple-love-is-signing-official-marriage-documents-1-scaled-r61l90lenpssoreui2difb0p9nbf7u5hll7nu8zcwo.jpg";
import Blogimage4 from "../BLOGS & ARTICLES/manikkalll-r4rmaja9x1cn4ah9zfu2m87r442d9gponhkmtcl82g.jpg"
import Blogimage5 from "../BLOGS & ARTICLES/Vintage-and-Retro-Styles-scaled-r2retx5mg8jlndjl1pcspyxl7b05j65r6g6vu5hzq0.jpg"
import Blogimage6 from "../BLOGS & ARTICLES/Kerala-bride-Jowllery-in-india-r57p13a71aabwz4itah9wp83q96z0cgd4yomokzifs.webp"
import Blogimage7 from "../BLOGS & ARTICLES/Hindu-wedding-tradishans-and-rituals-Kerala-e1744277896163-r45bqrg7wkowire4nb8angsmk1xs4jdk2hkagcpjq0.webp";
import Blogimage8 from "../BLOGS & ARTICLES/Heritage-home-property-wedding-ceremony-e1744191407899-r43l0k2stddo03k6z6uwdbedj0cbqegk9ets4wz09k.webp"
import Blogimage9 from "../BLOGS & ARTICLES/13380-r3pfgk626ztvnz8o1ea37uz89tkk4527v1y8ahst94.webp"
import Blogimage10 from "../BLOGS & ARTICLES/guruvayur-photo-1-1-r2rdzbiryenjodzrqh61joxczptyxwocazltduveag.webp"
import Blogimage11 from "../BLOGS & ARTICLES/open-hair-style-scaled-qzt7do4chpxwabhxspwjuimvkfzwl90vunsk7e03ko.webp"
import Blogimage12 from "../BLOGS & ARTICLES/nalukettil-new-qwztovyb5wlq6h1a071d70oxsikyjunywkeii9gkd4.webp"

function BlogSec() {

  const blogs = [
    {
      id: 1,
      image: Blogimage,
      category: "Destination wedding in Kerala",
      title: "Top 10 Destination Wedding Planners in Kerala",
      description:
        "Planning a wedding in God’s Own Country – Kerala is every couple’s dream. From",
    },
    {
      id: 2,
      image: Blogimage2,
      category:
        "Destination backwater wedding costs in Alleppey, Kumarakom, and Kochi",
      title:
        "Destination Backwater Wedding Cost in Alleppey, Kumarakom and Kochi? A Practical Breakdown",
      description:
        "Kerala, with its palm tree-filled, serene backwaters, is quickly becoming a favorite for couples",
    },
    {
      id: 3,
      image: Blogimage3,
      category: "Legal Requirements for a Destination Wedding in Kerala, India",
      title: "Legal Requirements for a Destination Wedding in Kerala",
      description:
        "Kerala, with its tranquil backwaters, verdant landscapes, and enticing beaches, is one of India’s",
    },
    {
      id: 4,
      image: Blogimage4,
      category: "Destination wedding in Kerala",
      title: "Top 10 Destination Wedding Planners in Kerala",
      description:
        "Planning a wedding in God’s Own Country – Kerala is every couple’s dream. From",
    },
    {
      id: 5,
      image: Blogimage5,
      category:
        "Destination backwater wedding costs in Alleppey, Kumarakom, and Kochi",
      title:
        "Destination Backwater Wedding Cost in Alleppey, Kumarakom and Kochi? A Practical Breakdown",
      description:
        "Kerala, with its palm tree-filled, serene backwaters, is quickly becoming a favorite for couples",
    },
    {
      id: 6,
      image: Blogimage6,
      category: "Legal Requirements for a Destination Wedding in Kerala, India",
      title: "Legal Requirements for a Destination Wedding in Kerala",
      description:
        "Kerala, with its tranquil backwaters, verdant landscapes, and enticing beaches, is one of India’s",
    },
     {
      id: 7,
      image: Blogimage7,
      category: "Destination wedding in Kerala",
      title: "Top 10 Destination Wedding Planners in Kerala",
      description:
        "Planning a wedding in God’s Own Country – Kerala is every couple’s dream. From",
    },
    {
      id: 8,
      image: Blogimage8,
      category:
        "Destination backwater wedding costs in Alleppey, Kumarakom, and Kochi",
      title:
        "Destination Backwater Wedding Cost in Alleppey, Kumarakom and Kochi? A Practical Breakdown",
      description:
        "Kerala, with its palm tree-filled, serene backwaters, is quickly becoming a favorite for couples",
    },
    {
      id: 9,
      image: Blogimage9,
      category: "Legal Requirements for a Destination Wedding in Kerala, India",
      title: "Legal Requirements for a Destination Wedding in Kerala",
      description:
        "Kerala, with its tranquil backwaters, verdant landscapes, and enticing beaches, is one of India’s",
    },
    {
      id: 10,
      image: Blogimage10,
      category: "Destination wedding in Kerala",
      title: "Top 10 Destination Wedding Planners in Kerala",
      description:
        "Planning a wedding in God’s Own Country – Kerala is every couple’s dream. From",
    },
    {
      id: 11,
      image: Blogimage11,
      category:
        "Destination backwater wedding costs in Alleppey, Kumarakom, and Kochi",
      title:
        "Destination Backwater Wedding Cost in Alleppey, Kumarakom and Kochi? A Practical Breakdown",
      description:
        "Kerala, with its palm tree-filled, serene backwaters, is quickly becoming a favorite for couples",
    },
    {
      id: 12,
      image: Blogimage12,
      category: "Legal Requirements for a Destination Wedding in Kerala, India",
      title: "Legal Requirements for a Destination Wedding in Kerala",
      description:
        "Kerala, with its tranquil backwaters, verdant landscapes, and enticing beaches, is one of India’s",
    },
  ];

  // FIRST 3 BLOGS ONLY
  // FIRST 3 BLOGS ONLY
const [visibleBlogs, setVisibleBlogs] = useState(3);

// LOAD MORE FUNCTION
const handleLoadMore = () => {
  setVisibleBlogs((prev) => prev + 3);
};

  return (
   <section className="melodia-blog-section">
  <div className="melodia-blog-container">

    
    <div className="melodia-blog-grid">

      {blogs.slice(0, visibleBlogs).map((blog) => (
        <div className="melodia-blog-card" key={blog.id}>

          <img
            src={blog.image}
            alt={blog.title}
            className="melodia-blog-image"
          />

          <div className="melodia-blog-content">

            <span className="melodia-blog-category">
              {blog.category}
            </span>

            <h3 className="melodia-blog-title">
              {blog.title}
            </h3>

            <p className="melodia-blog-text">
              {blog.description}
            </p>

            <button className="melodia-learn-btn">
              Learn More &gt;&gt;
            </button>

          </div>

        </div>
      ))}

    </div>

    {visibleBlogs < blogs.length && (
      <div className="melodia-load-more-wrapper">

        <button
          className="melodia-load-more-btn"
          onClick={handleLoadMore}
        >
          Load More
        </button>

      </div>
    )}

  </div>
</section>
  );
}

export default BlogSec;