import java.util.Scanner;

public class QuizGame {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Questions, options, and the correct option number (1-4)
        String[] questions = {
            "What is the capital of India?",
            "Which planet is closest to the Sun?",
            "How many days are in a leap year?",
            "Which language is used to style web pages?",
            "Which river flows through Guwahati?"
        };

        String[][] options = {
            {"Mumbai", "New Delhi", "Kolkata", "Chennai"},
            {"Venus", "Mercury", "Mars", "Earth"},
            {"365", "366", "364", "367"},
            {"HTML", "Python", "CSS", "Java"},
            {"Ganga", "Brahmaputra", "Yamuna", "Godavari"}
        };

        int[] correctAnswers = {2, 2, 2, 3, 2};

        int score = 0;

        // Loop through every question
        for (int i = 0; i < questions.length; i++) {
            System.out.println("\nQuestion " + (i + 1) + ": " + questions[i]);

            for (int j = 0; j < options[i].length; j++) {
                System.out.println((j + 1) + ". " + options[i][j]);
            }

            int answer = getValidAnswer(scanner);

            if (answer == correctAnswers[i]) {
                System.out.println("Correct!");
                score++;
            } else {
                System.out.println("Wrong! The right answer is: " + options[i][correctAnswers[i] - 1]);
            }
        }

        System.out.println("\nQuiz over! Your score: " + score + " out of " + questions.length);
        scanner.close();
    }

    // Keeps asking until the player types a number from 1 to 4
    static int getValidAnswer(Scanner scanner) {
        while (true) {
            System.out.print("Your answer (1-4): ");
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                if (number >= 1 && number <= 4) {
                    return number;
                }
            } else {
                scanner.next(); // throw away the invalid text
            }
            System.out.println("Please enter a number between 1 and 4.");
        }
    }
}
