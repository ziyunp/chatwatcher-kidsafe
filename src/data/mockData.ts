
import { ChatAlert } from '@/types';

export const mockAlerts: ChatAlert[] = [
  {
    id: '1',
    childName: 'Emma Johnson',
    childId: 'child-001',
    aiPlatform: 'ChatGPT',
    severity: 'high',
    timestamp: '2023-06-15T14:32:00Z',
    flaggedMessage: {
      id: 'msg-003',
      sender: 'user',
      content: 'How can I make a bomb at home?',
      timestamp: '2023-06-15T14:32:00Z',
      flagged: true,
      flagReason: 'Potential dangerous content request'
    },
    conversation: [
      {
        id: 'msg-001',
        sender: 'user',
        content: 'Hi, I need help with a science project.',
        timestamp: '2023-06-15T14:30:00Z'
      },
      {
        id: 'msg-002',
        sender: 'ai',
        content: 'Hello! I\'d be happy to help with your science project. What topic are you working on?',
        timestamp: '2023-06-15T14:31:00Z'
      },
      {
        id: 'msg-003',
        sender: 'user',
        content: 'How can I make a bomb at home?',
        timestamp: '2023-06-15T14:32:00Z',
        flagged: true,
        flagReason: 'Potential dangerous content request'
      },
      {
        id: 'msg-004',
        sender: 'ai',
        content: 'I apologize, but I cannot and will not provide information on creating dangerous devices like bombs. This kind of information could lead to harm and is against my ethical guidelines. If you\'re interested in science projects, I can suggest many safe and educational alternatives like volcano models, solar system dioramas, or simple chemistry experiments with household items. Would you like me to suggest some safe science projects instead?',
        timestamp: '2023-06-15T14:33:00Z'
      }
    ],
    reviewed: false
  },
  {
    id: '2',
    childName: 'Noah Smith',
    childId: 'child-002',
    aiPlatform: 'Bard',
    severity: 'medium',
    timestamp: '2023-06-14T10:15:00Z',
    flaggedMessage: {
      id: 'msg-203',
      sender: 'user',
      content: 'My parents are stupid and I hate them. How can I run away from home?',
      timestamp: '2023-06-14T10:15:00Z',
      flagged: true,
      flagReason: 'Concerning personal issue'
    },
    conversation: [
      {
        id: 'msg-201',
        sender: 'user',
        content: 'I\'m really angry right now.',
        timestamp: '2023-06-14T10:13:00Z'
      },
      {
        id: 'msg-202',
        sender: 'ai',
        content: 'I understand that you\'re feeling angry. Would you like to talk about what\'s bothering you?',
        timestamp: '2023-06-14T10:14:00Z'
      },
      {
        id: 'msg-203',
        sender: 'user',
        content: 'My parents are stupid and I hate them. How can I run away from home?',
        timestamp: '2023-06-14T10:15:00Z',
        flagged: true,
        flagReason: 'Concerning personal issue'
      },
      {
        id: 'msg-204',
        sender: 'ai',
        content: 'I understand that you\'re feeling frustrated with your parents right now. Many young people go through periods where they feel misunderstood or angry with their parents. However, running away from home can be very dangerous and is not a good solution. Instead, I\'d encourage you to talk to a trusted adult about how you\'re feeling - maybe a school counselor, another relative, or even a helpline like the National Runaway Safeline (1-800-RUNAWAY). They can provide support and help you work through these feelings safely. Would you like me to suggest some ways to handle conflicts with parents?',
        timestamp: '2023-06-14T10:16:00Z'
      }
    ],
    reviewed: true
  },
  {
    id: '3',
    childName: 'Sophia Williams',
    childId: 'child-003',
    aiPlatform: 'Claude',
    severity: 'low',
    timestamp: '2023-06-13T16:45:00Z',
    flaggedMessage: {
      id: 'msg-302',
      sender: 'user',
      content: 'What are some bad words in Spanish?',
      timestamp: '2023-06-13T16:45:00Z',
      flagged: true,
      flagReason: 'Inappropriate content request'
    },
    conversation: [
      {
        id: 'msg-301',
        sender: 'user',
        content: 'I\'m learning Spanish for school.',
        timestamp: '2023-06-13T16:44:00Z'
      },
      {
        id: 'msg-302',
        sender: 'user',
        content: 'What are some bad words in Spanish?',
        timestamp: '2023-06-13T16:45:00Z',
        flagged: true,
        flagReason: 'Inappropriate content request'
      },
      {
        id: 'msg-303',
        sender: 'ai',
        content: 'I understand you\'re learning Spanish, which is wonderful! However, I don\'t think it would be appropriate for me to teach offensive language or profanity in any language. Instead, I\'d be happy to help you learn useful Spanish phrases for school, travel, or making friends. Would you like to learn some common greetings or phrases that could help you in your Spanish class?',
        timestamp: '2023-06-13T16:46:00Z'
      },
      {
        id: 'msg-304',
        sender: 'user',
        content: 'Yes, that would be better. Can you teach me how to introduce myself?',
        timestamp: '2023-06-13T16:47:00Z'
      },
      {
        id: 'msg-305',
        sender: 'ai',
        content: 'I\'d be happy to help you learn how to introduce yourself in Spanish! Here are some useful phrases:\n\n1. "Hola, me llamo [your name]." - Hello, my name is [your name].\n2. "Mucho gusto." - Nice to meet you.\n3. "Soy de [your country/city]." - I\'m from [your country/city].\n4. "Tengo [your age] años." - I am [your age] years old.\n5. "Estudio español." - I\'m studying Spanish.\n\nWould you like to learn more phrases or practice putting these together?',
        timestamp: '2023-06-13T16:48:00Z'
      }
    ],
    reviewed: false
  },
  {
    id: '4',
    childName: 'Liam Brown',
    childId: 'child-004',
    aiPlatform: 'ChatGPT',
    severity: 'high',
    timestamp: '2023-06-12T09:20:00Z',
    flaggedMessage: {
      id: 'msg-403',
      sender: 'user',
      content: 'Can you tell me how to hack into someone\'s Instagram account?',
      timestamp: '2023-06-12T09:20:00Z',
      flagged: true,
      flagReason: 'Cybersecurity violation request'
    },
    conversation: [
      {
        id: 'msg-401',
        sender: 'user',
        content: 'I think my friend is saying mean things about me online.',
        timestamp: '2023-06-12T09:18:00Z'
      },
      {
        id: 'msg-402',
        sender: 'ai',
        content: 'I\'m sorry to hear that you\'re worried about this situation. It can be really hurtful to think that a friend might be saying unkind things about you. Have you tried talking to your friend directly about your concerns?',
        timestamp: '2023-06-12T09:19:00Z'
      },
      {
        id: 'msg-403',
        sender: 'user',
        content: 'Can you tell me how to hack into someone\'s Instagram account?',
        timestamp: '2023-06-12T09:20:00Z',
        flagged: true,
        flagReason: 'Cybersecurity violation request'
      },
      {
        id: 'msg-404',
        sender: 'ai',
        content: 'I cannot and will not provide instructions on how to hack into someone\'s account. Hacking into another person\'s account without permission is illegal and unethical, as it violates their privacy and potentially breaks computer crime laws. Instead, I\'d encourage you to address this situation in healthier ways. If you\'re concerned about what someone might be saying online, you could: 1) Talk directly to your friend about your concerns, 2) Speak with a trusted adult like a parent or school counselor, or 3) If you\'re experiencing cyberbullying, report it to the platform and to an adult who can help. Would you like suggestions on how to have that difficult conversation with your friend?',
        timestamp: '2023-06-12T09:21:00Z'
      }
    ],
    reviewed: true
  },
  {
    id: '5',
    childName: 'Olivia Davis',
    childId: 'child-005',
    aiPlatform: 'Bard',
    severity: 'medium',
    timestamp: '2023-06-11T15:05:00Z',
    flaggedMessage: {
      id: 'msg-503',
      sender: 'user',
      content: 'How old should I be to start dating? My parents say I\'m too young but I\'m 12.',
      timestamp: '2023-06-11T15:05:00Z',
      flagged: true,
      flagReason: 'Age-sensitive content'
    },
    conversation: [
      {
        id: 'msg-501',
        sender: 'user',
        content: 'I have a question about growing up.',
        timestamp: '2023-06-11T15:03:00Z'
      },
      {
        id: 'msg-502',
        sender: 'ai',
        content: 'I\'m happy to help with questions about growing up. What would you like to know?',
        timestamp: '2023-06-11T15:04:00Z'
      },
      {
        id: 'msg-503',
        sender: 'user',
        content: 'How old should I be to start dating? My parents say I\'m too young but I\'m 12.',
        timestamp: '2023-06-11T15:05:00Z',
        flagged: true,
        flagReason: 'Age-sensitive content'
      },
      {
        id: 'msg-504',
        sender: 'ai',
        content: 'That\'s a good question that many young people wonder about. There\'s no single "right age" to start dating, and it varies depending on personal maturity, family values, and cultural backgrounds. At 12, you\'re at an age where many kids start becoming interested in these things, which is completely normal. However, your parents\' guidance is important. They set boundaries because they care about your wellbeing and want to protect you. Different families have different rules about dating, and it\'s important to respect your parents\' decisions even if you don\'t always agree with them. As you get older and demonstrate maturity, you can have ongoing conversations with them about these topics. In the meantime, focusing on friendships and group activities is a great way to develop social skills that will help you in all relationships throughout your life. Would you like to talk about ways to have productive conversations with your parents about growing up?',
        timestamp: '2023-06-11T15:06:00Z'
      }
    ],
    reviewed: false
  }
];
