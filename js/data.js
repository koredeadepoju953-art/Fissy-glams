
const SITE = {
  name: 'Tissy Glams Studio',
  whatsapp: '2347089205758',          // international format, no + or spaces
  phoneDisplay: '2347089205758',
  instagram: 'Tissyglams',            // handle without @
  address: 'Isolu-Funis Junction, Alabata Road, Abeokuta, Ogun State',    // replace with the studio's full address
  hours: 'Monday to Saturday, 8am to 7pm',
  bank: { bank: 'Bank name', number: '0000000000', holder: 'Tissy Glams Studio' },
  depositNote: 'A 50% deposit confirms your booking date.'
};

const DELIVERY_ZONES = [
  { id: 'abk', label: 'Abeokuta (within town)', fee: 4000 },
  { id: 'ogun', label: 'Other parts of Ogun State', fee: 6000 },
  { id: 'lagos', label: 'Lagos', fee: 8000 },
  { id: 'other', label: 'Other states (we confirm fee)', fee: 0, confirm: true }
];

const SERVICES = [
  {
    group: 'Makeup', intro: 'Every look is matched to your skin tone and your outfit, and set to last through photos, heat and dancing.', items: [
      { id: 'soft', name: 'Soft glam', desc: 'Light, skin-like finish for dinners, birthdays and church events.', price: 15000, time: '1 hr' },
      { id: 'full', name: 'Full glam', desc: 'Full coverage, sculpted face, lashes included. Made for owambe and events.', price: 25000, time: '1.5 hrs' },
      { id: 'shoot', name: 'Photoshoot makeup', desc: 'Camera-ready makeup, with a touch-up kit for the shoot.', price: 30000, time: '1.5 hrs' },
      { id: 'bride', name: 'Bridal makeup', desc: 'Traditional or white wedding. Includes lashes and a touch-up kit.', price: 60000, time: '2 hrs' },
      { id: 'trial', name: 'Bridal trial', desc: 'Test your look before the big day. Booked at least 2 weeks ahead.', price: 20000, time: '1.5 hrs' }
    ]
  },
  {
    group: 'Gele', intro: 'Sharp, balanced gele tied to sit well and stay put all day.', items: [
      { id: 'gele', name: 'Gele tying', desc: 'One gele, styled to your outfit and face shape. Bring your own fabric.', price: 8000, time: '30 mins' },
      { id: 'gelep', name: 'Gele for bridal party', desc: 'Price per person for 4 or more people.', price: 6000, time: '20 mins each' },
      { id: 'combo', name: 'Makeup and gele', desc: 'Full glam and gele together, booked as one session.', price: 30000, time: '2 hrs' }
    ]
  },
  {
    group: 'Add-ons', intro: 'Added to any booking above.', items: [
      { id: 'home', name: 'Home or venue service', desc: 'Tissy comes to you. Final fee depends on distance.', price: 15000, time: 'from', from: true },
      { id: 'lashes', name: 'Premium lashes', desc: 'Upgrade to mink-style strip lashes.', price: 3000, time: 'add-on' }
    ]
  }
];

const TRAINING = [
  { id: 't1', name: 'Self-makeup lesson', length: '1 day, one-on-one', price: 50000, desc: 'Learn the makeup that suits your face, with the products you already own. Ideal if you want to do your own makeup for everyday and events.' },
  { id: 't2', name: 'Beginner makeup class', length: '2 weeks, small group', price: 200000, desc: 'Skin prep, colour matching, base, eyes, lips and lashes. You practise on models and leave with a basic kit list.' },
  { id: 't3', name: 'Gele tying workshop', length: '1 day', price: 30000, desc: 'Learn four gele styles, how to fold and pleat, and how to tie on someone else.' },
  { id: 't4', name: 'Professional masterclass', length: '4 weeks, limited seats', price: 350000, desc: 'For people starting a makeup business. Bridal and photoshoot looks, speed, pricing, client handling, and portfolio shots.' }
];

const PRODUCTS = [
  { id: 'p1', img: 'images/velvet-matte.jpg', name: 'Velvet matte lipstick', cat: 'Lips', price: 4500, shape: 'lipstick', bg: '#F3C3D2', color: '#A31A56', desc: 'Comfortable matte colour that does not dry out.', shades: ['Rose Nude', 'Berry Wine', 'Brick Red', 'Plum Night', 'Coral Pop'] },
  { id: 'p2', img: 'images/Glass-gloss.jpg', name: 'Glass gloss', cat: 'Lips', price: 3500, shape: 'gloss', bg: '#FBD9C8', color: '#E0707F', desc: 'Non-sticky shine, worn alone or over lipstick.', shades: ['Clear', 'Peach', 'Rose', 'Bronze'] },
  { id: 'p3', img: 'images/lip-liner.jpg', name: 'Define lip liner', cat: 'Lips', price: 2000, shape: 'pencil', bg: '#E9C9D6', color: '#7B2A4F', desc: 'Creamy liner that keeps the shape all day.', shades: ['Nude', 'Mocha', 'Wine', 'Red'] },
  { id: 'p4', img: 'images/Skin-match-foundation.jpg', name: 'Skin-match foundation', cat: 'Face', price: 9000, shape: 'bottle', bg: '#EBC8A6', color: '#8A5A3A', desc: 'Medium to full coverage in shades for fair to deep skin.', shades: ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'Rich Deep'] },
  { id: 'p5', img: 'images/concealer.jpg', name: 'Brightening concealer', cat: 'Face', price: 5000, shape: 'pencil', bg: '#F0D3B8', color: '#B07A4F', desc: 'Covers dark circles and spots without creasing.', shades: ['Light', 'Medium', 'Tan', 'Deep'] },
  { id: 'p6', img: 'images/Setting-powder.jpg', name: 'Setting powder', cat: 'Face', price: 6000, shape: 'compact', bg: '#F6E1CC', color: '#D8B48F', desc: 'Sets makeup with no flashback in photos.', shades: ['Translucent', 'Banana', 'Deep'] },
  { id: 'p7', img: 'images/Cheek-blush.jpg', name: 'Cheek blush', cat: 'Face', price: 4000, shape: 'compact', bg: '#F8CFCF', color: '#D9506A', desc: 'Silky powder blush that blends easily.', shades: ['Peach', 'Pink', 'Berry', 'Terracotta'] },
  { id: 'p8', img: 'images/Glam-palette.jpg', name: 'Glam eyeshadow palette', cat: 'Eyes', price: 12000, shape: 'palette', bg: '#E5CFE6', color: '#6B2E6E', desc: '18 pigmented shades, matte and shimmer.' },
  { id: 'p9', img: 'images/Volume-mascara.jpg', name: 'Volume mascara', cat: 'Eyes', price: 3500, shape: 'pencil', bg: '#D9D3DD', color: '#2B0F20', desc: 'Lifts and lengthens with no clumps.' },
  { id: 'p10', img: 'images/Strip-lashes.jpg', name: 'Strip lashes (3 pairs)', cat: 'Eyes', price: 5500, shape: 'lash', bg: '#E8D7D2', color: '#2B0F20', desc: 'Natural to dramatic, reusable.', shades: ['Natural', 'Wispy', 'Dramatic'] },
  { id: 'p11', img: 'images/Professional-brush-set.jpg', name: 'Professional brush set', cat: 'Tools', price: 15000, shape: 'brush', bg: '#F2D5E0', color: '#C8236B', desc: '12 soft brushes with a carry pouch.' },
  { id: 'p12', img: 'images/blending-sponge.jpg', name: 'Blending sponge', cat: 'Tools', price: 2000, shape: 'compact', bg: '#F9D5D0', color: '#F28B82', desc: 'Soft sponge for a smooth, airbrushed base.' },
  { id: 'p13', img: 'images/auto-gele.jpg', name: 'Ready-tied auto gele', cat: 'Gele', price: 12000, shape: 'gele', bg: '#F3C3D2', color: '#C8236B', desc: 'Pre-shaped gele you wear in seconds. Made from quality fabric.', shades: ['Fuchsia', 'Gold', 'Royal Blue', 'Emerald', 'Wine', 'Silver'] },
  { id: 'p14', img: 'images/gele-fabric.jpg', name: 'Gele fabric (2 yards)', cat: 'Gele', price: 9000, shape: 'gele', bg: '#EFD9A8', color: '#B8863B', desc: 'Firm fabric that holds sharp folds.', shades: ['Gold', 'Coral', 'Teal', 'Purple', 'Black'] }
];