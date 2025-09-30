import React, { useState, useEffect } from 'react';
import './Blog.css';
import Header from './Header';
import SiteFooter from './SiteFooter';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample blog articles data
  const sampleArticles = [
    {
      id: 1,
      title: "10 Essential Task Management Tips for Productivity",
      description: "Discover the most effective strategies to organize your tasks and boost your productivity with these proven techniques.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "The Psychology Behind Effective Time Management",
      description: "Understanding how your brain works can help you create better time management strategies that actually stick.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Digital Tools vs. Traditional Methods: What Works Best?",
      description: "A comprehensive comparison of digital task management tools versus traditional pen-and-paper methods.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Building Healthy Work Habits for Remote Teams",
      description: "Learn how to establish effective work habits that keep your remote team organized and productive.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "The Art of Saying No: Prioritizing Your Tasks",
      description: "Master the skill of declining non-essential tasks to focus on what truly matters for your goals.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Mindfulness and Task Management: A Perfect Match",
      description: "Discover how mindfulness practices can enhance your task management and reduce stress.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArticles(sampleArticles);
      setLoading(false);
    }, 1000);
  }, []);


  if (loading) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <Header/>
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Don’t Forget to Read Our Blog</h2>
          <p className="blog-subtitle">
            Stay updated with the latest insights on productivity, task management, and work-life balance.
          </p>
        </div>

        <div className="all-articles">
          <h3 className="section-title">Articles</h3>
          <div className="articles-grid">
            {articles.map(article => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <h4 className="article-title">{article.title}</h4>
                  <p className="article-excerpt">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
    <SiteFooter/>
    </>
  );
};

export default Blog;
