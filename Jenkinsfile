pipeline {
    agent any

    environment {
        MY_NAME = "kamal"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/nxtanalyst/MyFirstPipeline.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building code as user ${MY_NAME}"
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying application..."
            }
        }
    }
}
