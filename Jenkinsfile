pipeline {
    agent any
    tools {
        nodejs 'node16'
    }
    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-accesskey')
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
        stage('Run Tests on BrowserStack') {
            steps {
                sh 'npm run single-android'
            }
        }
        stage('Run Nightwatch Tests on BrowserStack') {
            steps {
                browserstack(credentialsId: '1bb72bec-9071-456e-994a-368e3aa8d5ee') {
                    sh 'npx nightwatch --env browserstack'
                }
            }
        }
    }

    post {
        always {
            // 1) Archive any test-output artifacts you have
            archiveArtifacts artifacts: '**/tests_output/**/*.*', allowEmptyArchive: true

            // 2) Publish the BrowserStack App Automate report exactly once here
            browserStackReportPublisher 'automate'
        }
    }
}
