pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "Jeevansurya123/backend-app"
        DOCKER_TAG   = "latest"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/GURRAMJEEVANSURYA/pipeline.git'
            }
        }

        stage('Build WAR') {
            steps {
                // Run Maven in the backend directory where pom.xml exists
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image from backend directory
                dir('backend') {
                    bat "docker build -f Dockerfile.backend -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %DOCKER_IMAGE%:%DOCKER_TAG%
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat """
                    docker stop backend || ver >NUL
                    docker rm backend || ver >NUL
                    docker run -d --name backend -p 8080:8080 %DOCKER_IMAGE%:%DOCKER_TAG%
                """
            }
        }
    }

    post {
        always {
            echo "Build URL: ${env.BUILD_URL}"
        }
        success {
            echo "Pipeline succeeded and container deployed on port 8080."
        }
        failure {
            echo "Pipeline failed; check earlier stage logs."
        }
    }
}
