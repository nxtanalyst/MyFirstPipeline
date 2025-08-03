pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-node-app .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Optional: Stop and remove old container if exists
                    sh '''
                    docker stop my-running-node-app || true
                    docker rm my-running-node-app || true
                    docker run -d -p 3000:3000 --name my-running-node-app my-node-app
                    '''
                }
            }
        }
    }
}
