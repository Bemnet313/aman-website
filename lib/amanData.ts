export type AmanMusicVideo = {
  title: string;
  artist: string;
  year: string;
  type: string;
  description: string;
  image: string;
  videoId: string;
  videoUrl: string;
};

export type AmanUpcomingRelease = {
  title: string;
  artist: string;
  year: string;
  type: string;
  description: string;
  image: string;
};

export type AmanGalleryItem = {
  src: string;
  title: string;
  alt: string;
  colSpan: string;
  aspect: string;
};

export type AmanInterview = {
  title: string;
  description: string;
  image: string;
  videoId: string;
  videoUrl: string;
};

export const amanMusicVideos: AmanMusicVideo[] = [
  {
    title: 'Kal',
    artist: 'Beki X Aman',
    year: '2021',
    type: 'Single',
    description: 'Over 9.1 million views on YouTube.',
    image: '/thumbs/kal.webp',
    videoId: 'UrDagB1EDwo',
    videoUrl: 'https://youtu.be/UrDagB1EDwo',
  },
  {
    title: 'Kalabay',
    artist: 'Aman X Biruk Ft. Lina',
    year: '2022',
    type: 'Single',
    description: 'A unique twist on Ethiopian future bass.',
    image: '/thumbs/kalabay.webp',
    videoId: 'PdVIYdBjK1Y',
    videoUrl: 'https://youtu.be/PdVIYdBjK1Y',
  },
  {
    title: 'Anemogn',
    artist: 'ChaCha X Aman',
    year: '2022',
    type: 'Single',
    description: 'House music meets Ethiopian six/eight rhythm.',
    image: '/thumbs/anemogn.webp',
    videoId: '4lFsa4q8Xd0',
    videoUrl: 'https://youtu.be/4lFsa4q8Xd0',
  },
];

export const amanFeaturedInterview: AmanInterview = {
  title: 'Press & Media',
  description: 'EBS Muzika Show. Behind the scenes of the journey.',
  image: '/thumbs/ebs-muzika.webp',
  videoId: 'CH3L443i-cg',
  videoUrl: 'https://youtu.be/CH3L443i-cg',
};

export const amanUpcomingRelease: AmanUpcomingRelease = {
  title: 'Tigat',
  artist: 'AMAN',
  year: 'Upcoming',
  type: 'Album',
  description: 'Upcoming album mentioned on the live site.',
  image: '/assets/tigat-album.webp',
};

export const amanGalleryItems: AmanGalleryItem[] = [
  {
    src: '/assets/amanP3.webp',
    title: 'THE LIVE EXPERIENCE',
    alt: 'AMAN performing a live electronic music set in Addis Ababa',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-video',
  },
  {
    src: '/assets/amanP4.webp',
    title: 'PORTRAIT',
    alt: 'Studio portrait of Ethiopian producer AMAN',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    src: '/assets/studio1.webp',
    title: 'THE LAB',
    alt: 'AMAN working in his music production studio with FL Studio',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    src: '/assets/amanP1.webp',
    title: 'ACOUSTIC FUSION',
    alt: 'AMAN with traditional Ethiopian instruments and modern studio gear',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-video',
  },
];
