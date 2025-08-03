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
                    dockerImage = docker.build("myapp")
                }
            }
        }

        stage('Clean Old Container') {
            steps {
                script {
                    // Stop and remove if exists
                    sh '''
                        if [ $(docker ps -aq -f name=myapp-container) ]; then
                            docker stop myapp-container || true
                            docker rm myapp-container || true
                        fi
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run on port 3000
                    sh 'docker run -d -p 3000:3000 --name myapp-container myapp'
                }
            }
        }
    }
}
