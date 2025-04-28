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
    }
    post {
        always {
            archiveArtifacts artifacts: '**/tests_output/**/*.*', allowEmptyArchive: true
        }
    }
}
