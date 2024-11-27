pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'ranahansa/next-note-app:latest'
    }
    stages {
        stage('Clone Repository') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/Ranahansa/next-note-application-'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Build Application') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    bat 'docker build -t ranahansa/next-note-app:${BUILD_NUMBER} .'
                }
            }
        }
        stage('Docker login') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'dockerhub-credentials-id', url: '']) {
                        bat 'docker login -u ranahansa -p ${test-dockerhubpass}'
                    }
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    bat 'docker push ranahansa/next-note-app:${BUILD_NUMBER}'
                }
            }
        }
        stage('Deploy to Vercel') {
            steps {
                script {
                    echo 'Deploying to Vercel...'
                    // Add Vercel CLI deployment if needed, or manual deploy steps
                }
            }
        }
    }
}
