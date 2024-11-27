pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'ranahansa/next-note-app'
        // Use Jenkins credentials for Docker Hub
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                retry(3) {
                    git branch: 'main', 
                        url: 'https://github.com/Ranahansa/next-note-application-', 
                        credentialsId: 'github-credentials' // Add GitHub credentials if private
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Use Node.js tool or specify Node.js version
                    nodejs(nodeJSInstallationName: 'NodeJS') {
                        bat 'npm cache clean --force'
                        bat 'npm install'
                    }
                }
            }
        }
        
        stage('Build Application') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS') {
                        bat 'npm run build'
                    }
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    // Build docker image with build number as tag
                    bat "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                    
                    // Also tag as latest
                    bat "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Docker Login and Push') {
            steps {
                script {
                    // Use Jenkins credentials for secure login
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-credentials', 
                        usernameVariable: 'DOCKER_USERNAME', 
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        bat '''
                            docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                            docker push %DOCKER_IMAGE%:%BUILD_NUMBER%
                            docker push %DOCKER_IMAGE%:latest
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to Vercel') {
            steps {
                script {
                    // Option 1: Use Vercel CLI if installed
                    // bat 'vercel deploy --prod'
                    
                    // Option 2: Use a webhook or API call
                    echo 'Deploying to Vercel...'
                    // Add your specific Vercel deployment method
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images to save space
            script {
                bat "docker rmi ${DOCKER_IMAGE}:${BUILD_NUMBER} || true"
                bat "docker logout"
            }
        }
        
        success {
            echo 'Build and deployment successful!'
        }
        
        failure {
            echo 'Build or deployment failed.'
        }
    }
}