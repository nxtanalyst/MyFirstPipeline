pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = "1"
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

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker rm -f my-node-app || true
                    docker run -d -p 3000:3000 --name my-node-app my-node-app
                '''
            }
        }
    }
}
