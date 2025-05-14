import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent{
  isChatOpen = false;
  userInput = '';
  messages: any[] = [
    {
      text: 'Hello! How can I assist you?',
      user: false,
      options: ['Booking', 'Cancel Booking','Login', 'Sign-Up', 'See password']
    }
  ];
  isTyping = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(input?: string) {
    const text = input || this.userInput.trim();
    if (text) {
      this.messages.push({ text, user: true });
      this.userInput = '';
      this.isTyping = true;
      setTimeout(() => {
        this.respondToUser(text);
      }, 500);
    }
  }

  respondToUser(userText: string) {
    const text = userText.toLowerCase();

    const keywordMap: { [key: string]: string } = {
      'cancel booking': 'To cancel a ticket, go to the cancellation section.',
      'cancel': 'To cancel a ticket, go to the cancellation section.',
      'view booking': 'To view your booking details, log into your account and click on "My Booking".',
      'booking details': 'To view your booking details, log into your account and click on "My Booking".',
      'my booking': 'To view your booking details, log into your account and click on "My Booking".',
      'booking': 'To book a Cab/Bus, visit our booking page, fill in the details, and click Submit.',
      'book': 'To book a Cab/Bus, visit our booking page, fill in the details, and click Submit.',
      'login': 'To log in, click the Login button at the top right. Enter your email and password. If you don’t have an account, click Sign Up.',
      'log in': 'To log in, click the Login button at the top right. Enter your email and password. If you don’t have an account, click Sign Up.',
      'sign up': 'To create an account, click the Sign Up button and fill in your details.',
      'signup': 'To create an account, click the Sign Up button and fill in your details.',
      'register': 'To create an account, click the Sign Up button and fill in your details.',
      'how to login': 'To log in, click the Login button on the top right. Enter your email and password.',
      'password eye': 'You can click the eye icon next to the password field to see what you’re typing.',
      'show password': 'Click the eye icon next to the password field to view or hide your password.',
      'see password': 'Click the eye icon to toggle visibility of your password.'
    };

    let response = "I'm sorry, I didn't understand that.";
    for (const keyword in keywordMap) {
      if (text.includes(keyword)) {
        response = keywordMap[keyword];
        break;
      }
    }

    setTimeout(() => {
      this.messages.push({ text: response, user: false });
      this.isTyping = false;
    }, 1000);
  }

  handleOptionClick(option: string) {
    this.sendMessage(option);
  }
}  