pipeline {
    agent {
        docker {
            image 'docker:24.0.5'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        HOME = "${env.WORKSPACE}"  // ✅ Override HOME to avoid permission error
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name my-node-app my-node-app'
            }
        }
    }
}
