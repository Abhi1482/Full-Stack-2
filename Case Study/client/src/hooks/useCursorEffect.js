import { useEffect } from 'react';

export const useCursorEffect = () => {
    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        const trails = [];
        const maxTrails = 8; // Number of trail particles

        // Create trail elements
        for (let i = 0; i < maxTrails; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push({
                element: trail,
                x: 0,
                y: 0,
                currentX: 0,
                currentY: 0,
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        // Update cursor position on mouse move
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update main cursor
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

            // Update cursor dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        };

        // Animate trails to follow cursor with delay
        const animateTrails = () => {
            trails.forEach((trail, index) => {
                const delay = (index + 1) * 0.08;

                trail.currentX += (mouseX - trail.currentX) * (1 - delay);
                trail.currentY += (mouseY - trail.currentY) * (1 - delay);

                trail.element.style.left = `${trail.currentX}px`;
                trail.element.style.top = `${trail.currentY}px`;
                trail.element.style.opacity = 1 - (index / maxTrails) * 0.7;
            });

            requestAnimationFrame(animateTrails);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateTrails();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cursor.remove();
            cursorDot.remove();
            trails.forEach(trail => trail.element.remove());
        };
    }, []);
};
