import type { Kysely } from 'kysely'

export async function seed(db: Kysely<any>): Promise<void> {
	await db.insertInto('accommodation')
		.values([
			{ 
				name: 'Senayan Residence', 
				city: 'Jakarta', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 3,
				description: 'Welcome to Senayan Residence, your premier destination for comfort and convenience in the heart of Jakarta, Indonesia. Our elegant hotel offers a blend of modern sophistication and traditional charm, featuring stylishly appointed rooms with all the amenities you need for a relaxing stay. Enjoy a range of facilities including a state-of-the-art fitness center, a refreshing outdoor pool, and a selection of dining options that cater to diverse tastes. Ideally situated in the vibrant Senayan district, Senayan Residence provides easy access to shopping, dining, and cultural attractions, making it the perfect choice for both business and leisure travelers seeking an exceptional experience in Jakarta.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Fruity Rock House', 
				city: 'Bandung', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 5,
				description: 'Discover the charm of Fruity Rock House in the vibrant city of Bandung, Indonesia. This uniquely themed hotel offers a refreshing escape with its colorful and eclectic décor, designed to make every stay a delightful experience. Guests can unwind in spacious rooms equipped with modern amenities and enjoy a variety of fresh, fruity-inspired dishes at our on-site restaurant. Conveniently located near Bandung’s popular attractions, Fruity Rock House provides the perfect blend of comfort and whimsy for travelers looking to explore this dynamic city.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Gajah Mada Palace', 
				city: 'Yogyakarta', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 4,
				description: 'Experience regal elegance at Gajah Mada Palace, situated in the cultural heart of Yogyakarta, Indonesia. This distinguished hotel features opulent rooms and suites that reflect the rich heritage of the region, complemented by contemporary comforts. Guests can indulge in exquisite local cuisine at our fine dining restaurant, relax in our tranquil gardens, or explore the nearby historic sites and vibrant markets. With its blend of traditional charm and modern luxury, Gajah Mada Palace offers a memorable stay for those seeking to immerse themselves in Yogyakarta’s rich culture.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Pearl Resort', 
				city: 'Denpasar', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 5,
				description: 'Welcome to Pearl Resort, an idyllic retreat located in Denpasar, Indonesia. Our beachfront haven offers stunning ocean views and a serene atmosphere perfect for relaxation. Each elegantly designed room features modern comforts and is just steps away from the pristine sandy shores. Enjoy exquisite seafood and international dishes at our ocean-view restaurant, take a dip in our infinity pool, or indulge in a rejuvenating spa treatment. Whether you\'re here for leisure or business, Pearl Resort provides a luxurious escape in the vibrant city of Denpasar.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Modernia Hotel', 
				city: 'Jakarta', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 3,
				description: 'Step into sophistication at Modernia Hotel, nestled in the bustling city of Jakarta, Indonesia. Our sleek, contemporary hotel features well-appointed rooms with cutting-edge amenities to ensure a comfortable and efficient stay. Enjoy a range of facilities including a high-tech business center, a chic rooftop bar with panoramic city views, and a gourmet restaurant serving international and local cuisine. Ideally positioned for both business and leisure, Modernia Hotel offers easy access to Jakarta’s key attractions and commercial hubs.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Matching Sky Hotel', 
				city: 'Cimahi', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 5,
				description: 'Elevate your stay at Matching Sky Hotel in Cimahi, Indonesia. This modern hotel boasts stylish, comfortable rooms with breathtaking views of the surrounding landscape. Guests can enjoy a variety of amenities, including a well-equipped fitness center, an inviting pool, and a cozy café serving delightful meals and snacks. Located in the peaceful city of Cimahi, Matching Sky Hotel offers a tranquil retreat with convenient access to the nearby attractions and vibrant city life, making it an ideal choice for both relaxation and exploration.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Barnacle Bay Guesthouse', 
				city: 'Cikarang', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 4,
				description: 'Welcome to Barnacle Bay Guesthouse, a charming retreat located in Cikarang, Indonesia. This cozy guesthouse provides a warm and inviting atmosphere with comfortable, well-furnished rooms designed for relaxation. Enjoy personalized service and a range of amenities including a delightful breakfast each morning and a peaceful garden area. Conveniently situated near local attractions and business districts, Barnacle Bay Guesthouse offers a welcoming haven for travelers seeking a homely experience in Cikarang.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
			{ 
				name: 'Rainy Days Hotel', 
				city: 'Bogor', 
				country: 'Indonesia', 
				pictures: JSON.stringify([
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
					`https://picsum.photos/seed/${Math.random() * 100}/600/400`,
				]), 
				star: 3,
				description: 'Find comfort and coziness at Rainy Days Hotel in Bogor, Indonesia. This charming hotel offers a warm ambiance perfect for escaping the rainy weather, with rooms designed for ultimate relaxation and comfort. Enjoy a hearty meal at our restaurant, take a leisurely stroll through our lush, rain-kissed gardens, or unwind in our inviting lounge areas. Located in the picturesque city of Bogor, Rainy Days Hotel provides a perfect blend of comfort and charm, ideal for travelers looking to enjoy a serene stay amidst nature.',
				facilities: JSON.stringify(['WiFi', 'Swimming Pool', 'Gym', 'Bar', 'Smart TV', 'Restaurant'])
			},
		])
		.execute();
	await db.insertInto('unit')
		.values([
			{ accommodation_id: 1, name: 'Deluxe Room', rate: 400000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 1, name: 'Superior Room', rate: 800000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 1, name: 'Junior Suite', rate: 2000000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 1, name: 'Presidential Suite', rate: 5000000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 2, name: 'King', rate: 350000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 2, name: 'Emperor', rate: 600000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 3, name: 'Standard', rate: 1000000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 4, name: 'Standard', rate: 2000000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 5, name: 'Standard', rate: 200000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 6, name: 'Standard', rate: 300000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 7, name: 'Standard', rate: 450000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
			{ accommodation_id: 8, name: 'Standard', rate: 500000, picture: `https://picsum.photos/seed/${Math.random() * 100}/600/400` },
		])
		.execute();	
}
