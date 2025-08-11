import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useChatWithAssistantMutation } from '../features/travel/travelApi';
import { RootState } from "../store";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

interface ChatMessage {
	id: string;
	text: string;
	isUser: boolean;
}

export default function Home() {
	const [chatWithAssistant, { isLoading }] = useChatWithAssistantMutation();
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const router = useRouter();
	const scrollViewRef = useRef<ScrollView>(null);

	// Get conversation history from Redux store
	const conversationHistory = useSelector((state: RootState) => state.travel.conversationHistory);

	// Convert conversation history to chat messages format
	useEffect(() => {
		if (conversationHistory && conversationHistory.length > 0) {
			const formattedMessages: ChatMessage[] = conversationHistory.map((entry, index) => {
				const messages: ChatMessage[] = [];

				// Add user message
				if (entry.role === 'user') {
					messages.push({
						id: `user-${index}`,
						text: entry.content,
						isUser: true
					});
				}

				// Add assistant response if it exists
				if (entry.role === 'assistant') {
					messages.push({
						id: `assistant-${index}`,
						text: entry.content,
						isUser: false
					});
				}

				return messages;
			}).flat();

			setChatMessages(formattedMessages);
		}
	}, [conversationHistory]);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		if (chatMessages.length > 0) {
			setTimeout(() => {
				scrollViewRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [chatMessages]);

	// Check if we have any assistant responses
	const hasAssistantResponse = chatMessages.some(msg => !msg.isUser);

	const handleChat = async () => {
		if (!userMessage.trim()) return;

		const userMsg: ChatMessage = {
			id: `user-${Date.now()}`,
			text: userMessage,
			isUser: true
		};

		// Add user message to chat immediately
		setChatMessages(prev => [...prev, userMsg]);
		const currentMessage = userMessage;
		setUserMessage(''); // Clear input

		try {
			const response = await chatWithAssistant({ currentMessage, conversationHistory }).unwrap();
			
			// Navigate to appropriate tab if specified
			if (response.tab && response.tab !== 'home') {
				// Small delay to show the response before navigating
				router.push(`/${response.tab}`);
			}

			console.log('Chat messages:', chatMessages);
		} catch (error) {
			console.error('Chat error:', error);
			// Add error message to chat
			const errorMsg: ChatMessage = {
				id: `error-${Date.now()}`,
				text: "I'm not really in the mood to talk right now. Let's try again later.",
				isUser: false,
			};
			setChatMessages(prev => [...prev, errorMsg]);
		}
	};

	const renderMessage = (message: ChatMessage) => {
		return (
			<View
				key={message.id}
				style={[
					styles.messageContainer,
					message.isUser ? styles.userMessage : styles.assistantMessage
				]}
			>
				<View
					style={[
						styles.messageBubble,
						message.isUser ? styles.userBubble : styles.assistantBubble
					]}
				>
					<Text
						style={[
							styles.messageText,
							message.isUser ? styles.userText : styles.assistantText
						]}
					>
						{message.text}
					</Text>
				</View>
				{/* <Text style={styles.timestamp}>
					{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</Text> */}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Welcome Section - Centered when no chat history */}
			<View style={[
				styles.welcomeSection,
				!hasAssistantResponse && styles.welcomeSectionCentered
			]}>
				<Text style={styles.title}>Welcome to Smart Travel Assistant</Text>
				<Text style={styles.subtitle}>Your AI-powered travel companion</Text>

				<View style={styles.inputContainer}>
					<TextInput
						value={userMessage}
						onChangeText={setUserMessage}
						onSubmitEditing={handleChat}
						returnKeyType="send"
						style={styles.input}
						placeholder="Hi there, let me help you plan your next trip..."
						placeholderTextColor="#888"
						editable={!isLoading}
					/>
				</View>

				{/* Loading indicator when no chat history */}
				{isLoading && chatMessages.length === 0 && (
					<ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 16 }} />
				)}
			</View>

			{/* Chat Messages - Show when we have conversation history */}
			{chatMessages.length > 0 && (
				<ScrollView
					ref={scrollViewRef}
					style={styles.chatContainer}
					contentContainerStyle={styles.chatContent}
					showsVerticalScrollIndicator={false}
				>
					{chatMessages.map(renderMessage)}

					{/* Loading indicator for assistant response */}
					{isLoading && (
						<View style={[styles.messageContainer, styles.assistantMessage]}>
							<View style={[styles.messageBubble, styles.assistantBubble, styles.loadingBubble]}>
								<ActivityIndicator size="small" color="#1976d2" />
								<Text style={[styles.messageText, styles.assistantText, { marginLeft: 8 }]}>
									Thinking...
								</Text>
							</View>
						</View>
					)}
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f4f8',
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	welcomeSection: {
		width: '100%',
		alignItems: 'center',
	},
	welcomeSectionCentered: {
		flex: 1,
		justifyContent: 'center',
		marginTop: -60, // Offset the paddingTop to truly center
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#555',
		marginBottom: 24,
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 16,
	},
	input: {
		width: '90%',
		height: 44,
		backgroundColor: '#fff',
		borderRadius: 22,
		paddingHorizontal: 20,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#ddd',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	chatContainer: {
		flex: 1,
		width: '100%',
		marginTop: 20,
	},
	chatContent: {
		paddingHorizontal: 10,
		paddingBottom: 20,
	},
	messageContainer: {
		marginVertical: 4,
		maxWidth: '80%',
	},
	userMessage: {
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
	},
	assistantMessage: {
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
	},
	messageBubble: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 18,
		marginBottom: 4,
		maxWidth: '100%',
	},
	userBubble: {
		backgroundColor: '#1976d2',
		borderBottomRightRadius: 4,
	},
	assistantBubble: {
		backgroundColor: '#fff',
		borderBottomLeftRadius: 4,
		borderWidth: 1,
		borderColor: '#e0e0e0',
	},
	loadingBubble: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	messageText: {
		fontSize: 16,
		lineHeight: 20,
	},
	userText: {
		color: '#fff',
	},
	assistantText: {
		color: '#333',
	},
	timestamp: {
		fontSize: 12,
		color: '#888',
		marginHorizontal: 8,
	},
});