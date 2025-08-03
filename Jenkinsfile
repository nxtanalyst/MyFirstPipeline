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
                        # Stop and remove container named myapp-container
                        docker stop myapp-container || true
                        docker rm myapp-container || true

                        # Kill any container using port 3000
                        PORT_IN_USE=$(docker ps --format '{{.ID}} {{.Ports}}' | grep ':3000' | awk '{print $1}')
                        if [ ! -z "$PORT_IN_USE" ]; then
                            docker stop $PORT_IN_USE || true
                            docker rm $PORT_IN_USE || true
                        fi
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
