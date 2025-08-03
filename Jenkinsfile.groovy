pipeline {
    agent {
        docker {
            image 'docker:24.0.5'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'DOCKER_CONFIG=$PWD/.docker docker build -t my-node-app .'
                sh 'rm -rf .docker'
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name my-node-container my-node-app'
            }
        }
    }
}
