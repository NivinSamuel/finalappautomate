pipeline {
    agent any

    tools {
        nodejs 'node16'
    }

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-accesskey')
        BROWSERSTACK_BUILD_NAME = "jenkins-${JOB_NAME}-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NivinSamuel/finalappautomate.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Nightwatch Tests on BrowserStack') {
            steps {
                browserstack(credentialsId: '1bb72bec-9071-456e-994a-368e3aa8d5ee') {
                    sh 'npx nightwatch --env browserstack'
                }
                sleep time: 15, unit: 'SECONDS' // 💤 Wait for BrowserStack to register the build
                browserStackReportPublisher 'automate'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/tests_output/**/*.*', allowEmptyArchive: true
            echo 'Build finished!'
        }
        failure {
            echo '❌ Build failed.'
        }
        success {
            echo '✅ Build succeeded.'
        }
    }
}
