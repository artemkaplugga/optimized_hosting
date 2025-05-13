import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FontLoader.js';

class Logo3D {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
        this.loadFont();
        this.animate();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        // Оптимизированное освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        
        this.scene.add(ambientLight, directionalLight);

        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
    }

    loadFont() {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            this.createLogo(font);
        });
    }

    createLogo(font) {
        this.logo = new THREE.Group();
        
        const letters = ['a', 'e', 't', 'i', 'x'];
        const letterSpacing = 0.1;
        let totalWidth = 0;

        // Создаем общие материалы для всех букв
        const mainMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.9,
            shininess: 100,
            specular: 0x00ffff
        });

        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });

        letters.forEach(letter => {
            // Создаем геометрию для буквы
            const textGeometry = new TextGeometry(letter, {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 8, // Уменьшаем количество сегментов
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3 // Уменьшаем количество сегментов скоса
            });

            textGeometry.computeBoundingBox();
            const letterWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            
            // Создаем меш для буквы
            const letterMesh = new THREE.Mesh(textGeometry, mainMaterial);
            letterMesh.position.x = totalWidth;
            
            // Создаем геометрию для свечения
            const glowGeometry = new TextGeometry(letter, {
                font: font,
                size: 1.1,
                height: 0.1,
                curveSegments: 8,
                bevelEnabled: false
            });

            const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
            glowMesh.position.x = totalWidth;
            glowMesh.position.z = -0.1;
            
            // Группируем букву и свечение
            const letterGroup = new THREE.Group();
            letterGroup.add(letterMesh, glowMesh);
            this.logo.add(letterGroup);
            
            totalWidth += letterWidth + letterSpacing;
        });

        // Центрируем логотип
        this.logo.position.x = -totalWidth / 2;
        this.scene.add(this.logo);

        // Оптимизированные частицы
        const particleCount = 100; // Уменьшаем количество частиц
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8; // Уменьшаем область частиц
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

            colors[i * 3] = 0.0;
            colors[i * 3 + 1] = 1.0;
            colors[i * 3 + 2] = 1.0;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        this.particles = new THREE.Points(
            particles,
            new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            })
        );
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.logo) {
            const time = Date.now() * 0.0005;
            this.logo.rotation.y = Math.sin(time) * 0.2;
            this.logo.rotation.x = Math.sin(time * 0.5) * 0.1;

            // Оптимизированная анимация частиц
            if (this.particles) {
                const positions = this.particles.geometry.attributes.position.array;
                const colors = this.particles.geometry.attributes.color.array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time + i) * 0.001;
                    const sparkle = Math.sin(time * 2 + i) * 0.5 + 0.5;
                    colors[i + 1] = sparkle;
                    colors[i + 2] = sparkle;
                }
                
                this.particles.geometry.attributes.position.needsUpdate = true;
                this.particles.geometry.attributes.color.needsUpdate = true;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the 3D logo when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('logo3d-container');
    if (container) {
        new Logo3D(container);
    }
}); 