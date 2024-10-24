import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 310;

    // Array that contains the stars
    const stars = [];

    // Frames per second
    const FPS = 60;

    // Number of stars
    const x = 100;

    // mouse location
    const mouse = {
      x: 0,
      y: 0
    };  

    // Push stars to array
    for (var i = 0; i < x; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    // Draw the scene
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      ctx.globalCompositeOperation = "lighter";
      
      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
      
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
      }
      
      ctx.beginPath();
      for (var i = 0, x = stars.length; i < x; i++) {
        var starI = stars[i];
        ctx.moveTo(starI.x,starI.y); 
        if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0, x = stars.length; j < x; j++) {
          var starII = stars[j];
          if(distance(starI, starII) < 150) {
            //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
            ctx.lineTo(starII.x,starII.y); 
          }
        }
      }
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    function distance( point1, point2 ){
      var xs = 0;
      var ys = 0;
    
      xs = point2.x - point1.x;
      xs = xs * xs;
    
      ys = point2.y - point1.y;
      ys = ys * ys;
    
      return Math.sqrt( xs + ys );
    }

    // Update star locations
    function update() {
      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
      
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
        
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
      }
    }

    canvas.addEventListener('mousemove', function(e){
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Update and draw
    function tick() {
      draw();
      update();
      requestAnimationFrame(tick);
    }

    tick();
  }, [])

  return (
    <header style={{position: 'relative', width: '100%', overflow: 'hidden'}}>
      <canvas id='canvas' style={{background: 'linear-gradient(to right, #000428, #004e92)', position: 'relative'}}></canvas>
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white'}}>
        <h1 className="hero__title">Mang Cardano về Việt Nam</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link 
            className="button button--secondary button--lg"
            to="/docs/getting-started/overview">
            Bắt đầu
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Mang Cardano về Việt Nam">
      {/* <HomepageHeader /> */}
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
