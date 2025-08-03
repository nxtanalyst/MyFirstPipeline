pipeline {
    agent {
        docker {
            image 'docker:24.0.5'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'DOCKER_CONFIG=$PWD/.docker docker build -t my-node-app .'
                sh 'rm -rf .docker'
            }
        }
    }
}
