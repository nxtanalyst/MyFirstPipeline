pipeline {
    agent any

    stage('Clone') {
    steps {
        git branch: 'main', url: 'https://github.com/nxtanalyst/MyFirstPipeline.git'
    }


        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name my-node-app my-node-app'
            }
        }
    }
}
