/**
 * IPFS Utility for Pinata Cloud
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_PINATA_API_KEY: Your Pinata API Key
 * - NEXT_PUBLIC_PINATA_API_SECRET: Your Pinata API Secret
 * - NEXT_PUBLIC_PINATA_GATEWAY: Optional - Your dedicated Pinata gateway URL
 */

import axios from 'axios';

export interface MarketMetadata {
  question: string;
  description: string;
  category: string;
  type: string;
  resolutionSource?: string;
  resolutionDate?: string;
  outcomes?: Array<{
    id: string;
    option: string;
    description?: string;
  }>;
  [key: string]: any;
}

const PINATA_API = 'https://api.pinata.cloud';

export class PinataClient {
  private static instance: PinataClient;
  private apiKey: string;
  private apiSecret: string;
  private gateway: string;

  private constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || '';
    this.apiSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET || '';
    this.gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'ipfs.io';

    if (!this.apiKey || !this.apiSecret) {
      console.warn('Pinata API key or secret not found. IPFS uploads will fail.');
    }
  }

  public static getInstance(): PinataClient {
    if (!PinataClient.instance) {
      PinataClient.instance = new PinataClient();
    }
    return PinataClient.instance;
  }

  /**
   * Upload JSON data to IPFS via Pinata
   */
  public async uploadJSON(data: any, name: string = 'market-metadata'): Promise<{ ipfsHash: string; url: string }> {
    try {
      const response = await axios.post(
        `${PINATA_API}/pinning/pinJSONToIPFS`,
        {
          pinataContent: data,
          pinataMetadata: {
            name: `${name}-${Date.now()}`,
            keyvalues: {
              type: 'market-metadata',
              timestamp: new Date().toISOString(),
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: this.apiKey,
            pinata_secret_api_key: this.apiSecret,
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      return {
        ipfsHash,
        url: `ipfs://${ipfsHash}`,
      };
    } catch (error) {
      console.error('Error uploading to IPFS via Pinata:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
  }

  /**
   * Get IPFS gateway URL for a given hash
   */
  public getGatewayUrl(ipfsHash: string): string {
    const hash = ipfsHash.replace('ipfs://', '');
    return `https://${this.gateway}/ipfs/${hash}`;
  }
}

// Export a singleton instance
export const pinata = PinataClient.getInstance();

/**
 * Helper function to upload market metadata to IPFS
 */
export async function uploadMarketMetadata(metadata: MarketMetadata): Promise<string> {
  try {
    const { url } = await pinata.uploadJSON(metadata, 'market-metadata');
    console.log('Metadata uploaded to IPFS:', url);
    return url;
  } catch (error) {
    console.error('Error in uploadMarketMetadata:', error);
    throw error;
  }
}
