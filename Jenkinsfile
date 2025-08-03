pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withDockerContainer(
                        image: 'docker:24.0.5',
                        args: '--entrypoint=\'\' -v /var/run/docker.sock:/var/run/docker.sock',
                        env: ['HOME=/tmp']
                    ) {
                        sh 'docker build -t my-node-app .'
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
