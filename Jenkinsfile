pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t myapp .'
                }
            }
        }

        stage('Clean Old Container') {
            steps {
                script {
                    sh '''
                        docker stop myapp-container || true
                        docker rm myapp-container || true
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name myapp-container myapp'
                }
            }
        }
    }
}
