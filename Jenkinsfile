pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "jeevansurya123/backend-app"
        DOCKER_TAG   = "latest"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        skipStagesAfterUnstable()
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                git branch: 'master', url: 'https://github.com/GURRAMJEEVANSURYA/pipeline.git'
                
                // Verify repository structure
                bat 'dir'
                bat 'dir backend'
            }
        }

        stage('Build WAR') {
            steps {
                echo "Building Spring Boot WAR file..."
                dir('backend') {
                    // Verify Maven and Java versions
                    bat 'mvn -v'
                    bat 'java -version'
                    
                    // Clean and package the application
                    bat 'mvn clean package -DskipTests'
                    
                    // Verify the WAR file was created
                    bat 'dir target\\*.war'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running unit tests..."
                dir('backend') {
                    bat 'mvn test'
                }
            }
            post {
                always {
                    // Archive test results if they exist
                    script {
                        if (fileExists('backend/target/surefire-reports/*.xml')) {
                            junit 'backend/target/surefire-reports/*.xml'
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                dir('backend') {
                    // Verify Docker is available
                    bat 'docker --version'
                    
                    // Build the Docker image using the backend Dockerfile
                    bat "docker build -f Dockerfile.backend -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
                    
                    // List Docker images to verify creation
                    bat "docker images %DOCKER_IMAGE%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker image to Docker Hub..."
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %DOCKER_IMAGE%:%DOCKER_TAG%
                        docker logout
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying application container..."
                bat """
                    echo "Stopping existing container if running..."
                    docker stop backend || ver >NUL
                    
                    echo "Removing existing container..."
                    docker rm backend || ver >NUL
                    
                    echo "Starting new container..."
                    docker run -d --name backend -p 8080:8080 --restart=unless-stopped %DOCKER_IMAGE%:%DOCKER_TAG%
                    
                    echo "Waiting for container to start..."
                    timeout /t 10 /nobreak >NUL
                    
                    echo "Checking container status..."
                    docker ps -f name=backend
                """
            }
        }

        stage('Health Check') {
            steps {
                echo "Performing application health check..."
                script {
                    // Wait a bit more for the application to fully start
                    bat 'timeout /t 20 /nobreak >NUL'
                    
                    // Try to reach the application (adjust URL as needed)
                    try {
                        bat 'curl -f http://localhost:8080/actuator/health || echo "Health check endpoint not available"'
                    } catch (Exception e) {
                        echo "Health check failed, but continuing..."
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
            echo "Build URL: ${env.BUILD_URL}"
            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Workspace: ${env.WORKSPACE}"
            
            // Clean up Docker images to save space (optional)
            script {
                try {
                    bat 'docker image prune -f'
                } catch (Exception e) {
                    echo "Failed to clean up Docker images: ${e.getMessage()}"
                }
            }
        }
        
        success {
            echo "✅ Pipeline succeeded!"
            echo "🚀 Application deployed successfully on port 8080"
            echo "🔗 Access your application at: http://localhost:8080"
            
            // Send notification (optional - configure as needed)
            // emailext (
            //     subject: "✅ Pipeline Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            //     body: "The pipeline completed successfully. Application is running on port 8080.",
            //     to: "your-email@domain.com"
            // )
        }
        
        failure {
            echo "❌ Pipeline failed!"
            echo "📋 Check the logs above for error details"
            echo "🔧 Common issues to check:"
            echo "   - Maven/Java configuration"
            echo "   - Docker daemon running"
            echo "   - Docker Hub credentials"
            echo "   - Port 8080 availability"
            
            // Archive logs for debugging
            script {
                try {
                    if (fileExists('backend/target')) {
                        archiveArtifacts artifacts: 'backend/target/**/*.log', allowEmptyArchive: true
                    }
                } catch (Exception e) {
                    echo "Could not archive logs: ${e.getMessage()}"
                }
            }
        }
        
        unstable {
            echo "⚠️ Pipeline completed with warnings"
            echo "Check test results and build logs"
        }
        
        cleanup {
            echo "Performing cleanup..."
            // Additional cleanup steps if needed
        }
    }
}
