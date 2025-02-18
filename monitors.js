// ECG Simulation
class ECGSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.maxPoints = 200;
        
        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        // ECG wave parameters
        this.baseline = this.canvas.height / 2;
        this.amplitude = this.canvas.height / 4;
        this.frequency = 0.1;
        this.phase = 0;
    }

    generateECGPoint() {
        this.phase += this.frequency;
        
        // Simulate ECG waveform
        let y = this.baseline;
        if (this.phase % 2 < 0.1) {
            y = this.baseline - this.amplitude * Math.sin(this.phase * Math.PI * 10);
        } else if (this.phase % 2 < 0.3) {
            y = this.baseline + this.amplitude * 1.5;
        } else {
            y = this.baseline + Math.sin(this.phase) * 10;
        }

        return y;
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add new point
        this.points.push(this.generateECGPoint());
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }

        // Draw ECG line
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 2;

        for (let i = 0; i < this.points.length; i++) {
            const x = (i / this.maxPoints) * this.canvas.width;
            const y = this.points[i];
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
    }
}

// SPO2 Simulation with smoother transitions
class SPO2Simulator {
    constructor() {
        this.element = document.querySelector('.spo2-value');
        this.values = [97, 98, 99];
        this.currentIndex = 1; // Start with 98
        this.transitionSpeed = 800; // 0.8 seconds between changes
    }

    updateValue() {
        // Randomly decide whether to go up or down from current value
        const direction = Math.random() > 0.5 ? 1 : -1;
        this.currentIndex = Math.min(Math.max(0, this.currentIndex + direction), 2);
        const newValue = this.values[this.currentIndex];
        
        // Update display with animation
        this.element.style.transition = 'color 0.3s ease';
        this.element.style.color = '#00ff00';
        this.element.textContent = newValue + '%';
        
        // Flash effect
        setTimeout(() => {
            this.element.style.color = '#66ff66';
        }, 150);
        
        setTimeout(() => {
            this.element.style.color = '#00ff00';
        }, 300);
    }

    startMonitoring() {
        setInterval(() => this.updateValue(), this.transitionSpeed);
    }
}

// Heart Rate Simulation with smoother transitions
class HeartRateSimulator {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.values = [70, 71, 72, 73, 74];
        this.currentIndex = 2; // Start with 72
        this.transitionSpeed = 1000; // 1 second between changes
    }

    updateRate() {
        // Randomly decide whether to go up or down from current value
        const direction = Math.random() > 0.5 ? 1 : -1;
        this.currentIndex = Math.min(Math.max(0, this.currentIndex + direction), 4);
        const newRate = this.values[this.currentIndex];
        
        // Update display with animation
        this.element.style.transition = 'color 0.3s ease';
        this.element.style.color = '#00ff00';
        this.element.textContent = newRate;
        
        // Flash effect
        setTimeout(() => {
            this.element.style.color = '#66ff66';
        }, 150);
        
        setTimeout(() => {
            this.element.style.color = '#00ff00';
        }, 300);
    }

    startMonitoring() {
        setInterval(() => this.updateRate(), this.transitionSpeed);
    }
}

// Initialize and start simulations
const ecgSimulator = new ECGSimulator('ecgCanvas');
const spo2Simulator = new SPO2Simulator();
const heartRateSimulator = new HeartRateSimulator('heartRate');

function animate() {
    ecgSimulator.draw();
    requestAnimationFrame(animate);
}

// Start all monitoring
spo2Simulator.startMonitoring();
heartRateSimulator.startMonitoring();
animate(); 