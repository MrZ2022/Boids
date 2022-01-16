class Boid{
    constructor(_x,_y){
        this.position = createVector(_x,_y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1,2));
        this.acceleration = createVector();
        this.color = 255;
        this.sight = 25;
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    alignment(boids){
        let steering = createVector();
        let count = 0;
        for(let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && d < this.sight){
                steering.add(other.velocity);
                count++;
            }
        }
        if(count > 0){
            steering.div(count);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids){
        let steering = createVector();
        let count = 0;
        for(let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && d < this.sight){
                steering.add(other.position);
                count++;
            }
        }
        if(count > 0){
            steering.div(count);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids){
        let steering = createVector();
        let count = 0;
        for(let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && d < this.sight){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                count++;
            }
        }
        if(count > 0){
            steering.div(count);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids){
        let alignment = this.alignment(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update(){
        this.color = 255;
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.set(0,0);
        if(this.position.x > width)
           this.position.x -= width;
        else if(this.position.x < 0)
            this.position.x += width;
        if(this.position.y > height)
            this.position.y -= height;
        else if(this.position.y < 0)
            this.position.y += height;
    }

    show(){
        strokeWeight(10);
        stroke(this.color);
        point(this.position);
    }

}